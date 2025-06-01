import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/AuthContent";

export const GitHubAuthCallbackPage = () => {
  const [params] = useSearchParams();
  const { gitHubSignIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;

    gitHubSignIn(code)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Git Hub login failed", error);
      });
  }, [params]);

  return <p>Signing in with GitHub...</p>;
};
