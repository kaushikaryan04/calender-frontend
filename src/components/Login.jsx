import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    console.log("Login data:", formData);
    try {
      const res = await axiosInstance.post("api/login", {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h2>Login</h2>
      <form style={{ width: "300px", textAlign: "center" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3174ad",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Do not have an account?{" "}
        <button
          onClick={() => navigate("/sign-up")}
          style={{
            background: "none",
            color: "#3174ad",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
