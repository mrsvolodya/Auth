import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext, useAuth } from "../../components/AuthContent";
import { Loader } from "../../components/Loader";

export function AccountActivationPage() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();
  const { currentUser, isChecked } = useAuth();

  useEffect(() => {
    if (!activationToken) {
      setError("Activation token is missing");
      setDone(true);
      return;
    }

    activate(activationToken)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => {
        setDone(true);
      });
  }, []);

  if (isChecked && currentUser) {
    return <Navigate to="/profile" />;
  }

  if (!done) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="m-8 text-2xl font-medium">Account activation</h1>
      {error && <p className="m-10 text-red-500">{error}</p>}
    </>
  );
}
