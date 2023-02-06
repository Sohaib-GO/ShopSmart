import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      setSuccess(true);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
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
          return res.json();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setIsLoggedIn(true);
          setError("");
          localStorage.setItem("user", JSON.stringify(data));
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);

    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(false);
          setError("");
        }
      });
  };

  return (
    <>
      {success && <div>Login Successful</div>}
      {error && <div>{error}</div>}

      {isLoggedIn && (
        <div>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
}

export default Login;
