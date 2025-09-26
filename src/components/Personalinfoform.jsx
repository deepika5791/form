import React, { useState, useEffect } from "react";
import "./Personalinfoform.css";
const Personalinfoform = () => {
  const [form, setInfo] = useState({ name: "", password: "", email: "" });
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlersubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.password < 6) {
      setMessage("Password should be atleast 6 characters");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://userform-u7ka.onrender.com", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.text();
      console.log("Response from Backend", data);
      setInfo({ name: "", password: "", email: "" });
    } catch (error) {
      console.log(error);
      setMessage("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlersubmit}>
        <input
          type="text"
          placeholder="enter something"
          name="name"
          onChange={ChangeHandler}
          value={form.name}
          required
        />

        <input
          type="password"
          placeholder="enter password"
          name="password"
          onChange={ChangeHandler}
          value={form.password}
          required
        />

        <input
          type="email"
          placeholder="enter email"
          name="email"
          onChange={ChangeHandler}
          value={form.email}
          required
        />
        <div className="formBtn">
          <button type="submit" className="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
            submit
          </button>
        </div>
      </form>
      {Message && <p className="response-message">{Message}</p>}
    </div>
  );
};

export default Personalinfoform;
