import React, { useState, useEffect } from "react";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

useEffect(() => {
if (success) {
setTimeout(() => {
window.location.href = "/home";
}, 3000);
}
}, [success]);

const handleSubmit = (e) => {
e.preventDefault();

const user = { email, password };

fetch("/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
})
  .then((res) => {
    if (res.status === 200) {
      setSuccess(true);
      setError("");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    if (data && data.error) {
      setError(data.error);
    }
  });
};

return (
<>
{success && <div>Login Successful</div>}
{error && <div>{error}</div>}

<form onSubmit={handleSubmit}>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      required
    />
    <button type="submit">Login</button>
  </form>
</>
);
}
export default Login;