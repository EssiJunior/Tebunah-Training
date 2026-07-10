import { API_URL } from "@/utils/baseURL";
import { Dispatch, SetStateAction } from "react";

export const userSignIn = async (
    dispatch: (arg: AuthUserAction) => void,
    formData: { email: string; password: string },
    setIsLoading: (arg: boolean) => void,
    setAlert: Dispatch<SetStateAction<{
        type: string;
        tag: string;
        message: string;
    }>>
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Login failed");
        }

        const res = await response.json();

        setAlert({ type: '', tag: '', message: '' })
        getCurrentUser(res.access_token, dispatch, setIsLoading);
    } catch (error) {
        if (error instanceof Error) {
            setAlert({ type: 'error', tag: '', message: error.message });
        } else {
            setAlert({ type: 'error', tag: '', message: 'An error occurred' });
        }
        console.error("Login error:", error);
        setIsLoading(false);
    }
};

export const getCurrentUser = async (
    token: string,
    dispatch: (arg: AuthUserAction) => void,
    setIsLoading: (arg: boolean) => void
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
        dispatch({
            type: 'STORE',
            payload: { user: safeUser, token: token },
        });
    } catch (error) {
        console.error("getCurrentUser error:", error);
    }
    finally {
        setIsLoading(false);
    }
};
