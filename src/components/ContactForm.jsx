import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../redux/formSlice";

const schema = yup
  .object({
    name: yup.string().required("Name is required").min(2, "Too short"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required").min(5, "Too short"),
  })
  .required();

function ContactForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(submitForm(data));
    alert("Form saved in Redux store!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bpld">Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          {...register("name")}
          className="w-full p-2 mb-2 border rounded"
        />
        <p className="text-red-500 mb-2">{errors.name?.message}</p>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          {...register("email")}
          className="w-full p-2 mb-2 border rounded"
        />
        <p className="text-red-500 mb-2">{errors.email?.message}</p>

        <label className="block mb-2 font-semibold">Message</label>
        <textarea
          {...register("message")}
          className="w-full p-2 mb-2 border rounded"
        />
        <p className="text-red-500 mb-2">{errors.message?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {formData && (
        <div className="mt-4 p-4 border-t">
          <h3 className="font-semibold">📦 Saved in Redux:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
