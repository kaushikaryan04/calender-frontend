import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      console.log("Sign Up data:", formData);
      const res = await axiosInstance.post("api/register", {
        username: formData.username,
        password: formData.password,
        password2: formData.password,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
      alert("Sign-up successful!");
      navigate("/");
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
      <h2>Sign Up</h2>
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
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
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
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
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
          onClick={handleSignUp}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3174ad",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            color: "#3174ad",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUpPage;
