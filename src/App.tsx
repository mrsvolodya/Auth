import { Route, Routes, useNavigate } from "react-router-dom";
import { CustomLink } from "./components/CustomLink";
import { HomePage } from "./pages/HomePage/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { usePageError } from "./hooks/usePageError";
import { useAuth } from "./components/AuthContent";
import { useEffect } from "react";
import { Loader } from "./components/Loader";
import { AxiosError } from "axios";
import { AccountActivationPage } from "./pages/AccountActivationPage/AccountActivationPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RequireAuth } from "./components/RequireAuth";
import { UsersPage } from "./pages/UsersPage/UsersPage";

function App() {
  const navigate = useNavigate();
  const [error, setError] = usePageError("");
  const { isChecked, currentUser, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error: AxiosError<{ message?: string }>) => {
        setError(error.response?.data?.message ?? "");
      });
  };

  return (
    <>
      <nav className="bg-gray-900 border-b-red-600 border-b-1 flex justify-between h-14">
        <div className="flex gap-4 items-center mx-3">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="users">Users</CustomLink>
        </div>
        <div className="flex items-center gap-3 mx-3">
          {currentUser ? (
            <button
              className="button is-light has-text-weight-bold"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <>
              <CustomLink to="/sign-up" className="h-7 rounded-xs bg-amber-600">
                Sign up
              </CustomLink>
              <CustomLink to="/login" className="h-7 rounded-xs bg-green-600">
                Log in
              </CustomLink>
            </>
          )}
        </div>
      </nav>
      <main>
        <section>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="login" element={<LoginPage />} />

            {/* <Route path="/" element={<RequireAuth />}> */}
              <Route path="/users" element={<UsersPage />} />
            {/* </Route> */}
          </Routes>
        </section>
        {error && <p className="">{error}</p>}
      </main>
    </>
  );
}

export default App;
