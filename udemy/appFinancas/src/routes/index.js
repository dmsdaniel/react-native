import React, { useContext } from 'react';
import AuthRoutes from './auth.route';
import AppRoutes from './app.route';
import { AuthContext } from '../contexts/auth';

function Routes(){
    const { signed } = useContext(AuthContext);
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;