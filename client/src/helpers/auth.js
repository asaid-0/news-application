import { logout } from '../API/user.api';

class Auth {
    constructor() {
        this.authenticated = !!localStorage.getItem("authenticated");
    }

    login(cb) {
        localStorage.setItem("authenticated", true);
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        logout().then(res => {
            if (res.status === "success") cb();
            localStorage.removeItem("authenticated");
        });
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
