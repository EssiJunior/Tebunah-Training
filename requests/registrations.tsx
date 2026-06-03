import { API_URL } from "@/utils/baseURL";


export const createRegistration = async (
    formData: Registration,
    setStatus: (arg: "error" | "sent" | "idle" | "sending") => void
) => {
    const data = {
        "name": formData.name,
        "email": formData.email,
        "phone": formData.phone,
        "address": formData.address,
        "academic_level": formData.academic_level,
        "format": formData.format,
        "price": formData.price,
        "formation": formData.formation,
        "message": formData.message,
        "session": formData.session
    }

    try {
        const response = await fetch(`${API_URL}/registrations`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log("Response: ", response);

        if (!response.ok) {
            const errorData = await response.json();
            setStatus("error")
            console.log(errorData.detail || "Registration failed");
        }

        setStatus("sent")
    } catch (error) {
        setStatus("error")
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("An error occurred");
        }
        console.error("Registration error:", error);
    }
};

export const updateRegistration = async (
    id: string,
    formData: Registration,
    setIsLoading: (arg: boolean) => void,
    setSaved: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    setIsLoading(true);
    formData.updated_at = new Date().toISOString();

    const { token, ...data } = formData;
    try {
        const response = await fetch(`${API_URL}/registrations/id&${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to update profile");
        }

        const result = await response.json();


        console.log("User: ", result);
        setError("")
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    } catch (error) {
        console.error("updateRegistration error:", error);
    }
    finally {
        setIsLoading(false);
    }
};

export const getRegistrations = async (
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/registrations/all`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to fetch registrations");
        }

        setError("")
        const result = await response.json();

        console.log("Registrations: ", result)

    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("An error occurred");
        }
    }
    finally {
        setIsLoading(false);
    }
};

export const deleteRegistration = async (
    email: string,
    token: string,
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${API_URL}/registrations/${email}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to delete account");
        }

        setError("");
    } catch (error) {
        console.error("deleteRegistration error:", error);
    }
    finally {
        setIsLoading(false);
    }
};