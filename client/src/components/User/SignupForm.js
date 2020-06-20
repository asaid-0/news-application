import React, { useState } from 'react';


const Signup = ({ styles }) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }
    
    return (
        <div className={styles.formPanel} id="signup">
            <label className={styles.formLabel} for="sign-name">Full Name</label>
            <input name="name" className={styles.formInput} id="sign-name" onChange={handleChange} />
            <label className={styles.formLabel} for="sign-email">Email</label>
            <input name="email" className={styles.formInput} id="sign-email" onChange={handleChange} />
            <label className={styles.formLabel} for="sign-pass">Password</label>
            <input name="password" className={styles.formInput} type="password" id="sign-pass"  onChange={handleChange}/>
            <label className={styles.formLabel} for="sign-confirm">Confirm password</label>
            <input name="passwordConfirmation" className={styles.formInput} type="password" id="sign-confirm" onChange={handleChange} />

            <button className={styles.formBtn} type="submit" onClick={handleSubmit}>Sign up</button>
        </div>
    );
}

export default Signup;