import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {signupUser} from "../redux/actions/userActions";

const styles = (theme) => ({ ...theme.styles })

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value })
    }

    render() {

        const { classes } = this.props;
        const { UI: { errors, loading }  } = this.props;
        const { password, email, confirmPassword, handle } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>Sign up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField name="email" type="email" label="Email"
                                   className={classes.textField} value={email} error={!!errors.email}
                                   onChange={this.handleChange} fullWidth helperText={errors.email}/>

                        <TextField name="password" type="password" label="Password"
                                   className={classes.textField} value={password} error={!!errors.password}
                                   onChange={this.handleChange} fullWidth helperText={errors.password}/>

                        <TextField name="confirmPassword" type="password" label="Confirm password"
                                   className={classes.textField} value={confirmPassword} error={!!errors.confirmPassword}
                                   onChange={this.handleChange} fullWidth helperText={errors.confirmPassword}/>

                        <TextField name="handle" type="text" label="Handle"
                                   className={classes.textField} value={handle} error={!!errors.handle}
                                   onChange={this.handleChange} fullWidth helperText={errors.handle}/>

                        { !!errors.general
                            && <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        }

                        <Button type="submit" variant="contained" color="primary"
                                className={classes.button} disabled={loading ? true : null}>
                            { loading ? <CircularProgress color="secondary" size={24}/> : "Sign up" }
                        </Button>
                        <br/>
                        <small>Already have an account?  <Link to="/login">Log in here</Link> </small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Signup.propTypes= {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = { signupUser };

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup)));