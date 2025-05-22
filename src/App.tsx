import { AxiosError } from "axios";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./components/AuthContent";
import { CustomLink } from "./components/CustomLink";
import { Loader } from "./components/Loader";
import { ProfileIcon } from "./components/ProfileIcon";
import { RequireAuth } from "./components/RequireAuth";
import { usePageError } from "./hooks/usePageError";
import { AccountActivationPage } from "./pages/AccountActivationPage/AccountActivationPage";
import { EmailChangeConfirmationPage } from "./pages/EmailChangeConfirmationPage/EmailChangeConfirmationPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
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
      <nav className="bg-gray-900 border-b-red-600 border-b-1 flex justify-between h-14 text-[12px] sm:text-[15px]">
        <div className="flex mx-1 sm:gap-4 items-center sm:mx-3">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="users">Users</CustomLink>
        </div>
        <div className="flex items-center gap-3 mx-3">
          {currentUser ? (
            <>
              <CustomLink
                to="/profile"
                aria-label="Profile"
                className="hover:bg-gray-800 rounded-full p-1 transition-colors"
              >
                <ProfileIcon />
              </CustomLink>
              <button
                className="border-1 border-red-600 outline-none rounded-md p-1 px-2 cursor-pointer bg-red-600"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
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
              path="activation/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="login" element={<LoginPage />} />

            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <UsersPage />
                </RequireAuth>
              }
            />
            <Route
              path="/users/me/confirm-email-change/:token"
              element={<EmailChangeConfirmationPage />}
            />
          </Routes>
        </section>
        {error && <p>{error}</p>}
      </main>
    </>
  );
}

export default App;
