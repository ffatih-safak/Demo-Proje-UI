import { Navigate } from 'react-router-dom';
import { useSessionLoginStatus } from "../network/useSession.jsx";
import React from 'react';


function PrivateRoute({ children }) {
    const loginStatus = useSessionLoginStatus();

    if (loginStatus === 0) {
        return <Navigate to="/login" />
    }else
    {
        return children;
    }

}

export default PrivateRoute;