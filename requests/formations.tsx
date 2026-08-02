import { API_URL } from "@/utils/baseURL";

export const getFormations = async (
    dispatch: (arg: FormationsAction) => void,
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/formations/all`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to fetch formations");
        }

        setError("")
        const result = await response.json();

        console.log("Formations: ", result)
        dispatch({
            type: 'STORE',
            payload: result,
        });
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

export const deleteFormation = async (
    email: string,
    token: string,
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${API_URL}/formations/${email}`, {
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
        console.error("deleteFormation error:", error);
    }
    finally {
        setIsLoading(false);
    }
};
