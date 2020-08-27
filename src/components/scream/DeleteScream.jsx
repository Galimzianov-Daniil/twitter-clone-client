import React, {Component} from 'react';

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
import {DeleteForever} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import MyButton from "../../utils/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    deleteButton: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1
    }
}

class DeleteScream extends Component {
    state = { isOpen: false }

    handleOpen = () => this.setState({ ...this.state, isOpen: true })
    handleClose = () => this.setState({ ...this.state, isOpen: false })

    render() {
        const { deleteScream, screamId, authenticated, handle, userHandle, classes } = this.props;
        const { isOpen } = this.state;

        return (authenticated && userHandle === handle) ? (
            <>
                <MyButton onClick={this.handleOpen} tip="Delete scream" btnClassName={classes.deleteButton}>
                    <DeleteForever color="secondary"/>
                </MyButton>
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete the scream?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={() => {
                            deleteScream(screamId);
                            this.handleClose()
                        }} color="primary" autoFocus variant="contained">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        ) : null;
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    handle: state.user.credentials.handle
})

export default withStyles(styles)(connect(mapStateToProps, { deleteScream })(DeleteScream));