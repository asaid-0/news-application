import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    // Conditional rendering function to check if user logged in
    const render = (props) => {
        if (auth.isAuthenticated()) {
            return <Component {...props} />;
        } else {
            return (
                <Redirect to={{
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }}
                />
            );
        }
    }

    return (
        <Route
            {...rest}
            render={render}
        />
    );
};
