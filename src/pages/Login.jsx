import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    form: {
        textAlign: "center"
    },
    pageTitle: {
        marginBottom: 20
    },
    textField: {
        marginBottom: 20
    },
    button: {
        marginBottom: 10,
    },
    customError: {
        marginBottom: 10,
        color: "red"
    }
}

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/login", userData)
            .then(res => {
                    console.log(res)
                    this.props.history.push('/')
                }
            )
            .catch(errors => {
                this.setState({ ...this.state, errors: errors.response.data })
            })
            .then(() => this.setState({ loading: false }))
    }

    handleChange = (event) => {
        // event.target
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    render() {

        const { classes } = this.props;
        const { errors, loading } = this.state;
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);