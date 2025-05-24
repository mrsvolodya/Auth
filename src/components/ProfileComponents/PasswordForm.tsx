import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Loader, PasswordFormValues } from "../../types/users";
import { SubmitBtn } from "../../ui/SubmitBtn";

interface PasswordFormProps {
  onSubmit: (values: PasswordFormValues) => void;
  loader: Loader;
}

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Password must contain at least one uppercase letter and one special symbol"
    ),
  confirmPassword: Yup.string()
    .required("Confirmation is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export function PasswordForm({ onSubmit, loader }: PasswordFormProps) {
  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
      validationSchema={passwordSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mt-2 p-4 bg-gray-700 rounded-lg">
          <div className="mb-2">
            <Field
              name="oldPassword"
              type="password"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="Old Password"
            />
            {errors.oldPassword && touched.oldPassword && (
              <div className="text-red-400 text-sm mt-1">
                {errors.oldPassword}
              </div>
            )}
          </div>
          <div className="mb-2">
            <Field
              name="newPassword"
              type="password"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="New Password"
            />
            {errors.newPassword && touched.newPassword && (
              <div className="text-red-400 text-sm mt-1">
                {errors.newPassword}
              </div>
            )}
          </div>
          <div className="mb-2">
            <Field
              name="confirmPassword"
              type="password"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="Confirm New Password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <SubmitBtn
            loader={loader.password}
            label="Update Password"
            isProcess="Updating password..."
          />
        </Form>
      )}
    </Formik>
  );
}
