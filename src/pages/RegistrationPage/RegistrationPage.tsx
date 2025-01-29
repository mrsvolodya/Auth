import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import clsx from "clsx"; // Імпорт clsx
import { AxiosError } from "axios";
import { usePageError } from "../../hooks/usePageError";
import { useAuth } from "../../components/AuthContent";
import { authService } from "../../services/authService";

type RegistrationError = AxiosError<{
  errors?: { email?: string; password?: string };
  message: string;
}>;

function validateEmail(value: string) {
  const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!value) return "Email is required";
  if (!EMAIL_PATTERN.test(value)) return "Email is not valid";
}

const validatePassword = (value: string) => {
  if (!value) return "Password is required";
  if (value.length < 6) return "At least 6 characters";
};

export const RegistrationPage = () => {
  const [error, setError] = usePageError("");
  const [registered, setRegistered] = useState(false);

  const { isChecked, currentUser } = useAuth();

  if (isChecked && currentUser) {
    return <Navigate to="/" />;
  }

  if (registered) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with the activation link</p>
      </section>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnMount={true}
        onSubmit={({ email, password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          authService
            .register(email, password)
            .then(() => setRegistered(true))
            .catch((error: RegistrationError) => {
              if (error.message) setError(error.message);
              if (!error.response?.data) return;
              const { errors, message } = error.response.data;
              formikHelpers.setFieldError("email", errors?.email);
              formikHelpers.setFieldError("password", errors?.password);
              if (message) setError(message);
            })
            .finally(() => formikHelpers.setSubmitting(false));
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="w-full max-w-sm mx-auto my-10 p-8 bg-white shadow-xl rounded-xl text-black">
            <h1 className="text-3xl font-semibold text-center mb-6">Sign up</h1>

            {/* Email Field */}
            <div className="mb-4">
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
            <div className="mb-4">
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
                      "border-gray-300": !(touched.password && errors.password),
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
            <div className="mb-4">
              <button
                type="submit"
                className={clsx(
                  "w-full bg-green-500 text-white py-2 rounded-lg font-semibold transition-all duration-200",
                  {
                    "opacity-50 cursor-not-allowed":
                      isSubmitting || errors.email || errors.password,
                    "hover:bg-green-600": !(
                      isSubmitting ||
                      errors.email ||
                      errors.password
                    ),
                  }
                )}
                disabled={isSubmitting || !!errors.email || !!errors.password}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>

      {error && (
        <p className="mt-4 w-full max-w-md mx-auto bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </p>
      )}
    </>
  );
};
