import * as Yup from "yup";

export const nameFieldSchema = Yup.string()
  .required("This field is required")
  .trim()
  .matches(/^[^\d]*$/, "Must not contain numbers")
  .min(2, "Must be at least 2 letters long");

export const registrationSchema = Yup.object({
  firstName: nameFieldSchema,
  lastName: nameFieldSchema,
  email: Yup.string().required("Email is required").email("Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "At least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
