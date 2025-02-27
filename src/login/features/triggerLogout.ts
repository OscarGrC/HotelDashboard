export const triggerLogout = () => {
    window.dispatchEvent(new CustomEvent("logout"));
};