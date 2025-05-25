import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContent";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useGoogleAuth = (options?: {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectPath?: string;
}) => {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      await googleSignIn(credentialResponse.credential);

      if (options?.onSuccess) {
        options.onSuccess();
      } else if (options?.redirectPath) {
        navigate(options.redirectPath);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Google authentication failed"
      );
      if (options?.onError) {
        options.onError(errorMessage);
      } else {
        console.error(errorMessage);
      }
    }
  };

  return {
    handleGoogleSuccess,
    handleGoogleError: options?.onError,
  };
};
