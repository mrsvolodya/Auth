import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import clsx from "clsx";
import { AxiosError } from "axios";
import { useAuth } from "../../components/AuthContent";
import { usePageError } from "../../hooks/usePageError";

const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

function validateEmail(value: string) {
  if (!value) return "Email is required";
  if (!EMAIL_PATTERN.test(value)) return "Email is not valid";
}

function validatePassword(value: string) {
  if (!value) return "Password is required";
  if (value.length < 6) return "At least 6 characters";
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = usePageError("");
  const { login, isChecked, currentUser } = useAuth();

  if (isChecked && currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center mt-10 text-black">
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Log in</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnMount={true}
          onSubmit={({ email, password }) => {
            return login(email, password)
              .then(() => {
                const state = location.state as { from?: Location };
                navigate(state.from?.pathname ?? "/");
              })
              .catch((error: AxiosError<{ message?: string }>) => {
                setError(error.response?.data?.message ?? "");
              });
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative mt-1">
                  <Field
                    validate={validateEmail}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    className={clsx(
                      "w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.email && errors.email,
                        "border-gray-300": !(touched.email && errors.email),
                      }
                    )}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <Field
                    validate={validatePassword}
                    name="password"
                    type="password"
                    id="password"
                    placeholder="*******"
                    className={clsx(
                      "w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.password && errors.password,
                        "border-gray-300": !(
                          touched.password && errors.password
                        ),
                      }
                    )}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                {touched.password && errors.password ? (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    At least 6 characters
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={clsx(
                    "w-full bg-green-600 text-white py-2 rounded-lg font-semibold transition-all duration-200",
                    {
                      "opacity-50 cursor-not-allowed":
                        isSubmitting || errors.email || errors.password,
                      "hover:bg-blue-700": !(
                        isSubmitting ||
                        errors.email ||
                        errors.password
                      ),
                    }
                  )}
                  disabled={isSubmitting || !!errors.email || !!errors.password}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </div>

              {/* Signup Link */}
              <p className="mt-4 text-center text-sm text-gray-600">
                Do not have an account?{" "}
                <Link to="/sign-up" className="text-green-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>

        {/* Error Notification */}
        {error && (
          <p className="mt-4 w-full text-center bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
