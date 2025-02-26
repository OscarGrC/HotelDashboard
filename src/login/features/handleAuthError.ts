import { useNavigate } from "react-router-dom";
import { triggerLogout } from "./triggerLogout";

export const handleAuthError = (response: Response): Response => {
  if (response.status === 403) {

    triggerLogout();

    throw new Error("Token expirado. Por favor, inicia sesión nuevamente.");
  }
  return response;
};