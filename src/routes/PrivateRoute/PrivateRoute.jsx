import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if (loading){
        return <div>Loading</div>
    }
    console.log(loading)
    if(user && user.uid){
        return children;
    }

    return <Navigate to="/"></Navigate>
};

export default PrivateRoute;