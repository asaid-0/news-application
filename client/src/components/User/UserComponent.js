import React, { useState } from "react";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

import styles from './UserComponent.module.css';

export default function UserComponent() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const LoadingBtn = (
    <button
      className={styles.formBtn}
      style={{ backgroundColor: "#3e3e3e" }}
      disabled>
      <i className="fa fa-circle-o-notch fa-spin"></i> Loading
    </button>
  )

  const ErrorAlert = (message) => (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )

  return (
    <>
      <div className={styles.labelformContainer}>
        <label htmlFor="btnToggle-log" className={`${styles.btnToggle} ${styles.formLabel}`}>Login</label>
        <label htmlFor="btnToggle-sign" className={`${styles.btnToggle} ${styles.formLabel}`}>Sign up</label>
      </div>

      <div className="container" style={{
        minHeight: "33rem",
        minWidth: "25rem",
        position: "relative"
      }}>
        <div className={styles.formContainer}>
          <input type="radio" name="btnToggles" id="btnToggle-log" onClick={() => setIsLoginForm(true)} className={`${styles.btnToggle} ${styles.formInput}`} defaultChecked={isLoginForm} />
          <input type="radio" name="btnToggles" id="btnToggle-sign" onClick={() => setIsLoginForm(false)} className={`${styles.btnToggle} ${styles.formInput}`} defaultChecked={!isLoginForm} />

          <LoginForm styles={styles} loadingBtn={LoadingBtn} errorAlert={ErrorAlert} />
          <SignupForm styles={styles} loadingBtn={LoadingBtn} errorAlert={ErrorAlert} />

        </div>
      </div>
    </>

  );
}