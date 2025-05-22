import * as Yup from "yup";

export const nameFieldSchema = Yup.string()
  .required("This field is required")
  .trim()
  .matches(/^[^\d]*$/, "Must not contain numbers");
