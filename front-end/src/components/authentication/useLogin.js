import { useState, useEffect } from "react";

const useLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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


  useEffect(() => {
    fetch("/api/current-user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);




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

  return {
    email,
    password,
    error,
    success,
    isLoggedIn,
    handleSubmit,
    handleLogout,
    setEmail,
    setPassword,
    user,
  };
};

export default useLogin;
