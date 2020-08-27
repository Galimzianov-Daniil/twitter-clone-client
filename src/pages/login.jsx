import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';



// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({ ...theme.styles })

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history)

    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value })
    }

    render() {

        const { classes } = this.props;
        const { UI: { errors, loading }  } = this.props;
        const { password, email } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField name="email" id="email" type="email" label="Email"
                            className={classes.textField} value={email} error={!!errors.email}
                            onChange={this.handleChange} fullWidth helperText={errors.email}/>

                        <TextField name="password" id="password" type="password" label="Password"
                            className={classes.textField} value={password} error={!!errors.password}
                            onChange={this.handleChange} fullWidth helperText={errors.password}/>

                        { !!errors.general
                            && <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        }

                        <Button type="submit" variant="contained" color="primary"
                                className={classes.button} disabled={loading ? true : null}>
                            { loading ? <CircularProgress color="secondary" size={24}/> : "Log in" }
                        </Button>
                        <br/>
                        <small>don't have an account?  <Link to="/signup">Sign up here</Link> </small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Login.propTypes= {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = { loginUser }

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login)));