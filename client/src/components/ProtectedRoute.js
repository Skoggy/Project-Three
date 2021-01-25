import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from '../utils/UserContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { user } = useUserContext()
    return <Route {...rest}
        render={(props) =>
            user ?
                <Component /> :
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } />

}