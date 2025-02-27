import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../login/AuthContext.jsx";


const PrivateRoute = ({ element }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    if (!authContext.state.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoute;