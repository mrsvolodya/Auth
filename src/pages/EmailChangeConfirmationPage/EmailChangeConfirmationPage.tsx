import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/AuthContent";
import { Loader } from "../../components/Loader";
import { accessTokenService } from "../../services/accessTokenService";
import { userService } from "../../services/userService";

export function EmailChangeConfirmationPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("");
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token is missing");
      return;
    }

    userService
      .confirmEmailChange(token)
      .then((data) => {
        // If backend returns new tokens and user
        if (data && data.accessToken && data.user) {
          accessTokenService.save(data.accessToken);
          checkAuth();
        }
        setStatus("success");
        setMessage("Email changed successfully. Redirecting to profile...");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Failed to change email");
      });
  }, [token, checkAuth, navigate]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <div>{message}</div>;
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center bg-green-500 ">
        {message}
      </div>
    );
  }

  return <div style={{ color: "red" }}>{message}</div>;
}
