import { API_URL } from "@/utils/baseURL";

export const userSignIn = async (
    formData: { email: string; password: string },
    setIsLoading: (arg: boolean) => void,
    setMessage: (arg: string) => void,
    setIsAuthenticated: (arg: boolean) => void
) => {
    console.log("Login data: ", formData);
    const data = new URLSearchParams();
    data.append("username", formData.email);
    data.append("password", formData.password);

    setIsLoading(true);

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
        });

        const res = await response.json();

        if (!response.ok) {
            setMessage(res.detail);
        }

        setMessage("")
        getCurrentUser(res.access_token, setIsLoading, setIsAuthenticated);
    } catch (error) {
        if (error instanceof Error) {
            setMessage(error.message);
        } else {
            setMessage("An error occurred");
        }
        console.error("Login error:", error);
        setIsLoading(false);
    }
};

export const getCurrentUser = async (
    token: string,
    setIsLoading: (arg: boolean) => void,
    setIsAuthenticated: (arg: boolean) => void
) => {
    try {
        const response = await fetch(`${API_URL}/auth/current_user`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to get user");
        }

        const user = await response.json();

        const { password, _id, id, ...safeUser } = user;

        console.log("User: ", safeUser);
        localStorage.setItem('tebunah_admin_auth', safeUser)
        setIsAuthenticated(true)
    } catch (error) {
        console.error("getCurrentUser error:", error);
        localStorage.removeItem('tebunah_admin_auth')
        setIsAuthenticated(false)
    }
    finally {
        setIsLoading(false);
    }
};
