import React, {Component} from 'react';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { submitComment } from "../../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = ({ styles }) => ({
    ...styles,
    form: {
        width: "100%"
    }
})

class CommentForm extends Component {

    state = {
        body: "",
        errors: this.props.errors
    }

    handleChange = event => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.errors) {
            this.setState( { errors: nextProps.errors })
        }

        if (!Object.keys(nextProps.errors).length) {
            this.setState( { body: "" })
        }
    }

    render() {
        const { errors } = this.state;
        const { classes, authenticated } = this.props;

        return authenticated ? (
            <Grid container component="form" onSubmit={this.handleSubmit} alignItems="center">
                <Grid item sm={4}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={!!errors.body}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        ) : null
    }
}

const mapStateToProps = state => ({
    errors: state.UI.errors,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));