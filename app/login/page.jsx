"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/styles/Login.module.css";
import Header from "@/components/Header";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      document.cookie = "auth_token=mock_secure_token; path=/; max-age=3600;";
      router.push("/");
    } else {
      setError("Please enter both email and password.");
      return;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.LockClosedIcon}>
            <LockClosedIcon
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                color: "#fff",
                backgroundColor: "#4338ca",
                padding: "8px",
              }}
            />
            </div>
            <div className={styles.signInHeader}>Sign in</div>
            <form className={styles.form} onSubmit={handleLogin}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.signInButton}>
                Sign in
              </button>

              <div className={styles.linkGroup}>
                <a href="#" className={styles.link}>
                  Forgot password?
                </a>
                <a href="#" className={styles.link}>
                  Don't have an account? Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
