export const getAuthToken = (): string => {
    const authState = localStorage.getItem("authState");
    if (authState) {
        try {
            const parsed = JSON.parse(authState);
            return parsed.token || "";
        } catch (err) {
            console.error("Error parsing authState", err);
            return "";
        }
    }
    return "";
};