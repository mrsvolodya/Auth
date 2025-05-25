import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProps } from "../types/users";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useAuth } from "./AuthContent";

export const GoogleAuth = ({ mode, onSuccess, onError }: GoogleAuthProps) => {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }
      await googleSignIn(credentialResponse.credential);

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/profile");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Google authentication failed"
      );
      if (onError) {
        onError(errorMessage);
      } else {
        console.error(errorMessage);
      }
    }
  };

  return (
    <div className="google-auth-container">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => onError?.("Google authentication failed")}
        theme="filled_blue"
        text={mode === "icon" ? "signin_with" : "signin_with"}
        shape="rectangular"
        logo_alignment="center"
        size={mode === "icon" ? "medium" : "large"}
        width={mode === "icon" ? "40" : undefined}
      />
    </div>
  );
};
