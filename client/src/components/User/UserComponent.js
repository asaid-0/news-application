import React, { useState } from "react";
import NewsComponent from '../News/NewsComponent';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

import styles from './UserComponent.module.css';

export default function UserComponent() {
  const [isLoginForm, setIsLoginForm] = useState(true);


  return (
    <>
      <div className={styles.labelformContainer}>
        <label for="btnToggle-log" className={`${styles.btnToggle} ${styles.formLabel}`}>Login</label>
        <label for="btnToggle-sign" className={`${styles.btnToggle} ${styles.formLabel}`}>Sign up</label>
      </div>

      <div className="container" style={{
        minHeight: "30rem",
        minWidth: "25rem",
        position: "relative"
      }}>
        <div className={styles.formContainer}>
          <input type="radio" name="btnToggles" id="btnToggle-log" onClick={() => setIsLoginForm(true)} className={`${styles.btnToggle} ${styles.formInput}`} checked={isLoginForm} />
          <input type="radio" name="btnToggles" id="btnToggle-sign" onClick={() => setIsLoginForm(false)} className={`${styles.btnToggle} ${styles.formInput}`} checked={!isLoginForm} />

          <LoginForm styles={styles} />
          <SignupForm styles={styles} />

        </div>
      </div>
    </>

  );
}