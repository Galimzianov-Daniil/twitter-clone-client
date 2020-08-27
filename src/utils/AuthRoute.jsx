import React from 'react';
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    console.log(authenticated ? <Redirect to="/"/> : <Component {...rest}/>)

    return (
        <Route {...rest} render={() => !!authenticated ? <Redirect to="/"/> : <Component {...rest}/>} />
    )
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);
