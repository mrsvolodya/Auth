import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "../../components/Loader";
import { AuthContext } from "../../components/AuthContent";

export function AccountActivationPage() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();

  useEffect(() => {
    if (!activationToken) return;

    activate(activationToken)
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => {
        setDone(true);
      });
  }, []);

  if (!done) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="m-8 text-2xl font-medium">Account activation</h1>
      {error ? (
        <p className="m-10 text-red-500">{error}</p>
      ) : (
        <p className="m-10 text-green-500">Your account is now active</p>
      )}
    </>
  );
}
