import { AxiosError } from "axios";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../components/AuthContent";
import { usePageError } from "../../hooks/usePageError";
import { authService } from "../../services/authService";
import { SubmitBtn } from "../../ui/SubmitBtn";
import { getErrorMessage } from "../../utils/getErrorMessage";

const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(EMAIL_PATTERN, "Email is not valid"),
});

export const ResetPasswordPage = () => {
  const [error, setError] = usePageError("");
  const [emailSent, setEmailSent] = useState(false);
  const { isChecked, currentUser } = useAuth();

  // Redirect authenticated users
  if (isChecked && currentUser) {
    return <Navigate to="/profile" />;
  }

  if (emailSent) {
    return (
      <div className="flex items-center justify-center mt-10 text-black">
        <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Check your email
          </h1>
          <p className="text-center text-gray-600">
            We have sent you an email with instructions to reset your password.
          </p>
          <p className="text-center text-gray-600 mt-4">
            If you don't receive an email within a few minutes, please check
            your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-10 text-black">
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={({ email }, { setSubmitting }) => {
            setError("");
            setSubmitting(true);

            // Call the reset password API
            authService
              .requestPasswordReset(email)
              .then(() => {
                setEmailSent(true);
              })
              .catch((error: AxiosError<{ message?: string }>) => {
                setError(
                  getErrorMessage(error, "Failed to request password reset")
                );
              })
              .finally(() => {
                setSubmitting(false);
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
                    name="email"
                    type="email"
                    id="email"
                    placeholder="e.g. your@email.com"
                    className={clsx(
                      "w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.email && errors.email,
                        "border-gray-300": !(touched.email && errors.email),
                      }
                    )}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <SubmitBtn
                loader={isSubmitting}
                label="Send Reset Link"
                isProcess="Sending..."
              />
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
