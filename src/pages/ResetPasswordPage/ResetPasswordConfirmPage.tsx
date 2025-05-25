import { AxiosError } from "axios";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../components/AuthContent";
import { usePageError } from "../../hooks/usePageError";
import { authService } from "../../services/authService";

const resetPasswordConfirmSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Password must contain at least one uppercase letter and one special symbol"
    ),
  confirmPassword: Yup.string()
    .required("Confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const ResetPasswordConfirmPage = () => {
  const [error, setError] = usePageError("");
  const [resetComplete, setResetComplete] = useState(false);
  const { isChecked, currentUser } = useAuth();
  const { token } = useParams(); // Get the token from URL

  // Redirect authenticated users
  if (isChecked && currentUser) {
    return <Navigate to="/profile" />;
  }

  if (!token) {
    return <Navigate to="/reset-password" />;
  }

  if (resetComplete) {
    return (
      <div className="flex items-center justify-center mt-10 text-black">
        <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Password Reset Complete
          </h1>
          <p className="text-center text-gray-600">
            Your password has been successfully reset.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-10 text-black">
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Set New Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your new password.
        </p>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordConfirmSchema}
          onSubmit={({ password }, { setSubmitting }) => {
            setError("");
            setSubmitting(true);

            // Call the reset password confirmation API
            authService
              .confirmPasswordReset(token, password)
              .then(() => {
                setResetComplete(true);
              })
              .catch((error: AxiosError<{ message?: string }>) => {
                setError(
                  error.response?.data?.message ?? "Failed to reset password"
                );
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative mt-1">
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter new password"
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
                </div>
                {touched.password && errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="relative mt-1">
                  <Field
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    className={clsx(
                      "w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500":
                          touched.confirmPassword && errors.confirmPassword,
                        "border-gray-300": !(
                          touched.confirmPassword && errors.confirmPassword
                        ),
                      }
                    )}
                  />
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={clsx(
                    "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all duration-200",
                    {
                      "opacity-50 cursor-not-allowed":
                        isSubmitting ||
                        errors.password ||
                        errors.confirmPassword,
                      "hover:bg-blue-700": !(
                        isSubmitting ||
                        errors.password ||
                        errors.confirmPassword
                      ),
                    }
                  )}
                  disabled={
                    isSubmitting ||
                    !!errors.password ||
                    !!errors.confirmPassword
                  }
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </div>
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
