import React, { useState } from 'react';
import userSchema from '../../helpers/schemas/userSchema';
import { CreateUser } from '../../API/user.api';
import { useHistory } from 'react-router-dom';
import auth from '../../helpers/auth';
import _ from 'lodash';

const Signup = ({ styles, loadingBtn }) => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isLogged: false
    });

    const [isLoading, setIsLoadig] = useState(false);
    const [error, setError] = useState({});

    React.useEffect(() => {
        if (user.isLogged) {
            history.push("/");
        }
    }, [user.isLogged, history]);

    const errorText = (message) => (
        <span
            style={{
                fontSize: "0.8rem"
            }}
            className="font-italic pull-left text-danger">
            {message}
        </span>
    );
    const handleError = (error) => {
        const allErrors = error.details.reduce((agg, err) => ({ ...agg, [err.name]: err.message }), {})
        setError(allErrors);
        setIsLoadig(false);
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadig(true);
        const newUserSchema = userSchema;
        const cleanedData = newUserSchema.clean({ ...user, userPhoto: user.userPhoto ? user.userPhoto.name : null });
        try {
            newUserSchema.validate(cleanedData);
        } catch (err) {
            return handleError(err);
        }

        try {
            await CreateUser(user.name, user.email, user.password);
            auth.login(() => setUser({ ...user, isLogged: true }));
        } catch (err) {
            // handle server validation errors
            const errorsList = err.response.data.message
            if (errorsList) {
                setError({
                    name: _.get(errorsList, 'name.properties.message'),
                    email: _.get(errorsList, 'email.properties.message'),
                    password: _.get(errorsList, 'password.properties.message')
                });
            }
        } finally {
            setIsLoadig(false);
        }
    }

    return (
        <div className={styles.formPanel} id="signup">
            <div className={styles.inputContainer}>
                <label className={styles.formLabel} htmlFor="sign-name">Full Name</label>
                <input name="name" className={styles.formInput} id="sign-name" onChange={handleChange} />
                {error.name ? errorText(error.name) : ''}
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.formLabel} htmlFor="sign-email">Email</label>
                <input name="email" className={styles.formInput} id="sign-email" onChange={handleChange} />
                {error.email ? errorText(error.email) : ''}
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.formLabel} htmlFor="sign-pass">Password</label>
                <input name="password" className={styles.formInput} type="password" id="sign-pass" onChange={handleChange} />
                {error.password ? errorText(error.password) : ''}
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.formLabel} htmlFor="sign-confirm">Confirm password</label>
                <input name="confirmPassword" className={styles.formInput} type="password" id="sign-confirm" onChange={handleChange} />
                {error.confirmPassword ? errorText(error.confirmPassword) : ''}
            </div>
            {
                isLoading ? loadingBtn :
                    <button className={styles.formBtn} type="submit" onClick={handleSubmit}>Sign up</button>
            }
        </div >
    );
}

export default Signup;