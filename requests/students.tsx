import { API_URL } from "@/utils/baseURL";

export const getStudents = async (
    dispatch: (arg: StudentsAction) => void,
    token: string,
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/students/all`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to fetch students");
        }

        setError("")
        const result = await response.json();

        console.log("Students: ", result)

        result.forEach((student: Student) => {
            if (!student.academicLevel && student.academic_level) {
                student.academicLevel = student.academic_level;
            }
        });

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

export const deleteRegistration = async (
    email: string,
    token: string,
    setIsLoading: (arg: boolean) => void,
    setError: (arg: string) => void
) => {
    setIsLoading(true);
    try {
        const response = await fetch(`${API_URL}/students/${email}`, {
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
