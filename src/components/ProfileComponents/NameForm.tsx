import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { nameFieldSchema } from "../../validation/userSchemas";

interface NameFormValues {
  firstName: string;
  lastName: string;
}

interface NameFormProps {
  initialFirstName: string;
  initialLastName: string;
  onSubmit: (values: NameFormValues) => void;
}

const nameSchema = Yup.object().shape({
  firstName: nameFieldSchema.label("First name"),
  lastName: nameFieldSchema.label("Last name"),
});

export function NameForm({
  initialFirstName,
  initialLastName,
  onSubmit,
}: NameFormProps) {
  return (
    <Formik
      initialValues={{ firstName: initialFirstName, lastName: initialLastName }}
      validationSchema={nameSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mt-2 p-4 bg-gray-700 rounded-lg">
          <div className="mb-2">
            <Field
              name="firstName"
              type="text"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName && (
              <div className="text-red-400 text-sm mt-1">
                {errors.firstName}
              </div>
            )}
          </div>
          <div className="mb-2">
            <Field
              name="lastName"
              type="text"
              className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded"
              placeholder="Last Name"
            />
            {errors.lastName && touched.lastName && (
              <div className="text-red-400 text-sm mt-1">{errors.lastName}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-all duration-200"
          >
            Update Name
          </button>
        </Form>
      )}
    </Formik>
  );
}
