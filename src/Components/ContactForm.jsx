import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactForm = ({ setNotification }) => {
  const formData = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (data, e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_t01tnng",
        "template_jc8gpkn",
        formData.current,
        "jg4NXo6kyvRxoYjdu"
      )
      .then(
        () => {
          setNotification("Message sent successfully!");
          setTimeout(() => setNotification(""), 3000);
          setIsSending(false);
          formData.current.reset();
        },
        (error) => {
          setNotification("Failed to sent message!");
          setTimeout(() => setNotification(""), 3000);
          setIsSending(false);
          console.error(error.text);
        }
      );
  };

  return (
    <main className="bg-white p-7 w-[600px] border-1 border-zinc-300 rounded-lg shadow-lg">
      {/* Form Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl text-zinc-800 mb-2 font-bold">Get In Touch</h1>
        <p className="text-md text-zinc-500">
          We're here to help.Send us a message and we'll get back to you soon.
        </p>
      </div>
      {/* Form */}
      <form ref={formData} onSubmit={handleSubmit(sendEmail)} noValidate>
        {/* <form autoComplete='off' ref = {formData} onSubmit ={sendEmail}> */}
        <div className="flex items-center gap-5">
          <div className="flex-1">
            <label htmlFor="user-name" className="text-zinc-800">
              Name
            </label>
            <input
              {...register("user-name", { required: "Name is required" })}
              type="text"
              name="user-name"
              id="user-name"
              placeholder="Name"
              className="border-1 border-zinc-300 w-full bg-zinc-100 h-11 pl-3 mt-2 text-sm focus:outline-blue-600 rounded-lg"
            />
            {errors["user-name"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["user-name"].message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="user-email" className="text-zinc-800">
              Email
            </label>
            <input
              {...register("user-email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              name="user-email"
              id="user-email"
              placeholder="Email"
              className="border-1 border-zinc-300 w-full bg-zinc-100 h-11 pl-3 mt-2 text-sm focus:outline-blue-600 rounded-lg"
            />
            {errors["user-email"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["user-email"].message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="user-subject" className="text-zinc-800">
            Subject
          </label>
          <input
            {...register("user-subject", { required: "Subject is required" })}
            type="text"
            name="user-subject"
            id="user-subject"
            placeholder="Subject"
            className="border-1 border-zinc-300 w-full bg-zinc-100 h-11 pl-3 mt-2 text-sm focus:outline-blue-600 rounded-lg"
          />
          {errors["user-subject"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["user-subject"].message}
            </p>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="message" className="text-zinc-800">
            Message
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            name="message"
            id="message"
            rows={5}
            placeholder="Type your message here...."
            required
            className="border-1 border-zinc-300 w-full bg-zinc-100 pl-3 mt-2 text-sm focus:outline-blue-600 rounded-lg resize-none"
          >
            {errors["message"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["message"].message}
              </p>
            )}
          </textarea>
        </div>
        <div className="mt-8">
          <button
            type="Submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg active:bg-blue-700 cursor-pointer disabled:opacity-50"
            disabled={isSending}
          >
            {/* Send Message */}
            {isSending ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ContactForm;
