import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EmailFormValues, Loader } from "../../types/users";
import { SubmitBtn } from "../../ui/SubmitBtn";

interface EmailFormProps {
  onSubmit: (values: EmailFormValues) => void;
  loader: Loader;
}

const emailSchema = Yup.object().shape({
  newEmail: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("New email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid format (e.g., user@domain.com)"
    ),
  password: Yup.string().required("Current password is required"),
});

export function EmailForm({ onSubmit, loader }: EmailFormProps) {
  return (
    <Formik
      initialValues={{ newEmail: "", password: "" }}
      validationSchema={emailSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mt-2 p-4 bg-gray-700 rounded-lg">
          <div className="mb-2">
            <Field
              name="newEmail"
              type="email"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="New Email"
            />
            {errors.newEmail && touched.newEmail && (
              <div className="text-red-400 text-sm mt-1">{errors.newEmail}</div>
            )}
          </div>
          <div className="mb-2">
            <Field
              name="password"
              type="password"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="Current Password"
            />
            {errors.password && touched.password && (
              <div className="text-red-400 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <SubmitBtn
            loader={loader.email}
            label="Update Email"
            isProcess="Updating email..."
          />
        </Form>
      )}
    </Formik>
  );
}
