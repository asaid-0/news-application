class Auth {
    constructor() {
        this.authenticated = !!localStorage.getItem("authenticated");
    }

    login(cb) {
        // TODO: check if user authenticated from localStorage flag
        // P.S. JWT token will be stored in cookies for more security 
        // will add cookie security options like HttpOnly, and SameSite 

        localStorage.setItem("authenticated", true);
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        localStorage.removeItem("authenticated");
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
