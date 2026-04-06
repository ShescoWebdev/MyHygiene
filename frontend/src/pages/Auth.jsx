import { useState } from "react";
import API from "../api";

function Auth() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const { data } = await API.post("/auth/register", form);

      // Save token
      localStorage.setItem("token", data.token);

      alert("Registered successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const login = async () => {
    try {
      const { data } = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", data.token);

      alert("Login successful");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Auth;