import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {postScream} from "../../redux/actions/dataActions";
import MyButton from "../../utils/MyButton";
import {Add, Close} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";

const styles = ({ styles }) => ({
    ...styles,
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10
    },
    submitButton: {
        float: "right"
    }

})

class PostScream extends Component {

    state = {
        open: false,
        body: "",
        errors: this.props.errors
    }

    handleOpen = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false, errors: {}, body: "" })
    handleChange = event => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.errors) {
            this.setState( { errors: nextProps.errors })
        }

        if (!Object.keys(nextProps.errors).length && !nextProps.loading) {
            this.handleClose();
        }
    }

    render() {
        const { open, errors } = this.state;
        const { classes, loading } = this.props;

        return (
            <>
                <MyButton onClick={this.handleOpen} tip="Post a scream!">
                    <Add/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <Close/>
                    </MyButton>
                    <DialogTitle>Post a scream!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="SCREAM!!!"
                                multiline
                                rows="3"
                                placeholder="Scream at your fellow apes"
                                error={!!errors.body}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <DialogActions>
                                <Button
                                    type="submit" variant="contained" color="primary"
                                    className={classes.submitButton} disabled={loading}>
                                    {loading ?
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                        : "Submit"
                                    }
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.UI.errors,
    loading: state.UI.loading
})

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));