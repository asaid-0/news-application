import React, { useState } from 'react';


const Login = ({ styles }) => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({...user});
    }

    return (
        <div className={styles.formPanel} id="login">
            <label className={styles.formLabel} for="log-email">Email</label>
            <input name="email" className={styles.formInput} id="log-email" onChange={handleChange} />
            <label className={styles.formLabel} for="log-pass">Password</label>
            <input name="password" className={styles.formInput} type="password" id="log-pass" onChange={handleChange} />

            <button className={styles.formBtn} type="submit" onClick={handleSubmit}>Login</button>
        </div>
    );
}

export default Login;