import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContent";
import { GitHubLoginButton } from "../../components/ProfileComponents/SocialAuth/GitHub/GitHubLoginButton";
import { GoogleAuthBtn } from "../../components/ProfileComponents/SocialAuth/GoggleAuthBtn";
import { usePageError } from "../../hooks/usePageError";
import { authService } from "../../services/authService";
import { RegistrationError, RegistrationFormValues } from "../../types/users";
import { CustomCheckbox } from "../../ui/CustomCheckbox";
import { SubmitBtn } from "../../ui/SubmitBtn";
import { registrationSchema } from "../../validation/userSchemas";

export const RegistrationPage = () => {
  const [error, setError] = usePageError("");
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isChecked, currentUser } = useAuth();

  const handleGoogleSuccess = () => {
    setRegistered(true);
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  if (isChecked && currentUser) {
    return <Navigate to="/profile" />;
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
      <Formik<RegistrationFormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registrationSchema}
        validateOnMount={true}
        onSubmit={({ firstName, lastName, email, password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          authService
            .register(firstName, lastName, email, password)
            .then(() => setRegistered(true))
            .catch((error: RegistrationError) => {
              if (error.message) setError(error.message);
              if (!error.response?.data) return;
              const { errors, message } = error.response.data;
              formikHelpers.setFieldError("email", errors?.email);
              formikHelpers.setFieldError("password", errors?.password);
              formikHelpers.setFieldError("firstName", errors?.firstName);
              formikHelpers.setFieldError("lastName", errors?.lastName);
              formikHelpers.setFieldError(
                "confirmPassword",
                errors?.confirmPassword
              );
              if (message) setError(message);
            })
            .finally(() => formikHelpers.setSubmitting(false));
        }}
      >
        {({ touched, errors, isSubmitting }) => {
          return (
            <Form className="w-full max-w-sm mx-auto my-10 p-8 bg-white shadow-xl rounded-xl text-black">
              <h1 className="text-3xl font-semibold text-center mb-6">
                Sign up
              </h1>
              <div className="flex justify-between space-x-1.5">
                {/* First Name Field} */}
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className={clsx(
                      "w-full p-2 border  rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.firstName && errors.firstName,
                        "border-gray-300": !(
                          touched.firstName && errors.firstName
                        ),
                      }
                    )}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  {/* Last Name Field} */}
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className={clsx(
                      "w-full p-2 border  rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.lastName && errors.lastName,
                        "border-gray-300": !(
                          touched.lastName && errors.lastName
                        ),
                      }
                    )}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                {/* Email Field */}
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
                    placeholder="e.g. bobsmith@gmail.com"
                    className={clsx(
                      "w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 ",
                      {
                        "border-red-500": touched.email && errors.email,
                        "border-gray-300": !(touched.email && errors.email),
                      },
                      "active:border-amber-400"
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
              <div className="mb-3">
                {/* Password Field */}

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className={clsx(
                      "w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500": touched.password && errors.password,
                        "border-gray-300": !(
                          touched.password && errors.password
                        ),
                      }
                    )}
                  />
                  <div className="flex items-center">
                    <CustomCheckbox
                      id="showPassword"
                      checked={showPassword}
                      onChange={setShowPassword}
                      label="show password"
                    />
                  </div>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="mb-3">
                {/* Confirm Password Field */}

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative mt-1">
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter password again"
                    className={clsx(
                      "w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300",
                      {
                        "border-red-500":
                          touched.confirmPassword && errors.confirmPassword,
                        "border-gray-300": !(
                          touched.confirmPassword && errors.confirmPassword
                        ),
                      }
                    )}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Add Google Auth button */}
              <GoogleAuthBtn
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              {/* Add GitHub  button */}

              <GitHubLoginButton />
              {/* Submit Button */}
              <div className="mb-4">
                <SubmitBtn
                  loader={isSubmitting}
                  label="Sign up"
                  isProcess="Signing up..."
                />
              </div>
              {/* Login Link */}
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>

      {error && (
        <p className="mt-4 w-full max-w-md mx-auto bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </p>
      )}
    </>
  );
};
