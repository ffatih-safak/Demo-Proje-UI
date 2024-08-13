import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSessionLoginStatus } from "../network/useSession.jsx";

function UnAuthorizedRoute({ children }) {
    const loginStatus = useSessionLoginStatus();
    
    if (loginStatus != 0) {
        return <Navigate to="/" />
    }
    return children;
}

export default UnAuthorizedRoute;