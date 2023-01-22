import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import css from "./Contact.module.css";
const Contact = () => {
  const [state, handleSubmit] = useForm("xpzbzwwg");
  if (state.succeeded) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "2.5rem",
          marginTop: "3rem",
        }}
      >
        Thanks for joining!
      </p>
    );
  }
  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <div className={css.buttonWrapper}>
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Contact;
