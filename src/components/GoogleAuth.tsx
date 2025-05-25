import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

interface GoogleAuthProps {
  mode?: "signin" | "signup";
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectPath?: string;
}

export const GoogleAuth = ({
  mode = "signup",
  onSuccess,
  onError,
  redirectPath,
}: GoogleAuthProps) => {
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth({
    onSuccess,
    onError,
    redirectPath,
  });

  return (
    <div className="google-auth-container">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => handleGoogleError?.("Google authentication failed")}
        theme="filled_blue"
        text={mode === "signin" ? "signin_with" : "continue_with"}
        shape="rectangular"
        logo_alignment="center"
        size="large"
        width="100%"
        locale="en"
      />
    </div>
  );
};
