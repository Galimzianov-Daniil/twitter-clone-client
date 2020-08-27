import React, { Component } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";

import { editUserDetails } from "../../redux/actions/userActions";

// MUI
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const styles = ({ styles }) => ({
    ...styles,
    logout: {
        float: "right"
    }
})

class EditDetails extends Component {

    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    }

    componentDidMount = () => {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleClose = () => {
        this.setState({ ...this.state, open: false })
    }

    handleOpen = () => {
        this.setState({ ...this.state, open: true })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value })
    }

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : ""
        })
    }

    handleSubmit = (event) => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {

        const { classes } = this.props;

        return (
            <>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.logout}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="md">
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                            <form>
                                    <TextField
                                        name="bio"
                                        type="text"
                                        label="Bio"
                                        multiline
                                        rows="3"
                                        placeholder="A short bio about you"
                                        className={classes.textField}
                                        value={this.state.bio}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="website"
                                        type="text"
                                        label="Website"
                                        placeholder="Your website"
                                        className={classes.textField}
                                        value={this.state.website}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="location"
                                        type="text"
                                        label="Location"
                                        placeholder="Where you live?"
                                        className={classes.textField}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />

                            </form>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </>
        )
    }
}

EditDetails.propType = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default withStyles(styles)(connect(mapStateToProps, { editUserDetails })(EditDetails));