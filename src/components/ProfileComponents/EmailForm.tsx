import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface EmailFormValues {
  email: string;
  password: string;
}

interface EmailFormProps {
  onSubmit: (values: EmailFormValues) => void;
}

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("New email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid format (e.g., user@domain.com)"
    ),
  password: Yup.string().required("Current password is required"),
});

export function EmailForm({ onSubmit }: EmailFormProps) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={emailSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mt-2 p-4 bg-gray-700 rounded-lg">
          <div className="mb-2">
            <Field
              name="email"
              type="email"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="New Email"
            />
            {errors.email && touched.email && (
              <div className="text-red-400 text-sm mt-1">{errors.email}</div>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-all duration-200"
          >
            Update Email
          </button>
        </Form>
      )}
    </Formik>
  );
}
