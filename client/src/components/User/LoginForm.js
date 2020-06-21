import React, { useState } from 'react';
import { UserLogin } from '../../API/user.api';
import { useHistory } from "react-router-dom";
import auth from '../../helpers/auth';

const Login = (props) => {
    const history = useHistory();
    const { styles, loadingBtn, errorAlert } = props;
    const [user, setUser] = useState({
        email: "",
        password: "",
        isLogged: false
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (user.isLogged) {
            history.push("/");
        }
    }, [user.isLogged, history]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const LoginHandler = async () => {
        try {
            await UserLogin(user.email, user.password);
            auth.login(() => setUser({ ...user, isLogged: true }));

        } catch (error) {
            // Error 
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const handleSubmit = (e) => {
        setError("");
        setIsLoading(true);
        e.preventDefault();
        LoginHandler()
            .then(() => setIsLoading(false))

    }

    return (
        <div className={styles.formPanel} id="login">
            <label className={styles.formLabel} htmlFor="log-email">Email</label>
            <input name="email" className={styles.formInput} id="log-email" onChange={handleChange} />
            <label className={styles.formLabel} htmlFor="log-pass">Password</label>
            <input name="password" className={styles.formInput} type="password" id="log-pass" onChange={handleChange} />
            {
                isLoading ? loadingBtn :
                    <button className={styles.formBtn} type="submit" onClick={handleSubmit}>Login</button>
            }
            {
                error ? errorAlert(error) : ''
            }
        </div>
    );
}

export default Login;