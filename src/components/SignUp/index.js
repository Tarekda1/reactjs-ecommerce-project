import React, { useState } from "react";
import "./styles.scss";

import { auth, handleUserProfile } from "../../firebase/utils";

import FormInput from "../Form/FormInput";
import Button from "../Form/Button";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, errors } = form;

    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      setForm({
        ...form,
        errors: err,
      });
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      setForm({ ...initialState });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="wrap">
        <h2>Signup</h2>
        {form.errors.length > 0 && (
          <ul>
            {form.errors.map((err, i) => {
              return <li key={i}>{err}</li>;
            })}
          </ul>
        )}

        <div className="formWrap">
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={form.displayName}
              placeholder="Full Name"
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
