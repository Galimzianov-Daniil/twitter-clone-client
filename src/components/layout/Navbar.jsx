import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";

import PostScream from "../scream/PostScream";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button"
import { NavLink } from "react-router-dom";
import {Home as HomeIcon} from "@material-ui/icons";
import Notifications from "./Notifications";

class Navbar extends React.Component {
    render() {

        const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <>
                            <NavLink to="/">
                                <MyButton tip="Home">
                                    <HomeIcon/>
                                </MyButton>
                            </NavLink>
                            <PostScream/>
                            <Notifications/>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={NavLink} to="/">Home</Button>
                            <Button color="inherit" component={NavLink} to="/login">Login</Button>
                            <Button color="inherit" component={NavLink} to="/signup">Signup</Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar);
