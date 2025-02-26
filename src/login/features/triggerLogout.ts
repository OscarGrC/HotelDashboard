export const triggerLogout = (navigate: (path: string) => void) => {
    window.dispatchEvent(new CustomEvent("logout"));
};