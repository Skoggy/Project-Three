import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

const _PublicRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(renderProps) => {
                return user ? <Redirect to='/' /> : <Component {...renderProps} />;
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return { user: state.user };
}

export const PublicRoute = connect(mapStateToProps)(_PublicRoute);