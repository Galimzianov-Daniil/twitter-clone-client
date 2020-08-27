import React, {PureComponent} from 'react';
import { connect } from "react-redux";
import {getScream} from "../../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../utils/MyButton";
import {Chat, Close, UnfoldMore} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { clearErrors } from "../../redux/actions/dataActions";


const styles = ({ styles }) => ({
    ...styles,
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10
    },
    profileImage: {
        objectFit: "cover",
        width: 200,
        height: 200,
        borderRadius: "50%"
    },
    loaderWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 200
    },
    expandButton: {
        position: "absolute",
        right: 0
    }
})

class ScreamDialog extends PureComponent {
    state = {
        open: false,
        oldPath: "",
        newPath: ""
    }

    componentDidMount = () => {
        if (this.props.isOpen) {
            this.handleOpen()
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;

        const newPath = `/users/${userHandle}/scream/${screamId}`;
        window.history.pushState(null, null, newPath);

        if (oldPath === newPath) oldPath = `/users/${userHandle}`

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    }

    handleClose= () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.props.clearErrors();
        this.setState({ open: false })
    }

    render() {
        const {
            classes,
            scream: {
                likeCount, commentCount,
                screamId, body, createdAt,
                userImg, userHandle, comments
            },
            UI: { loading }
        } = this.props;

        const { open } = this.state;

        const dialogMarkup = loading ? (
            <div className={classes.loaderWrap}>
                <CircularProgress size={100}/>
            </div>
        ) : (
            <Grid container alignItems="center">
                <Grid item sm={5}>
                    <img src={userImg} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <Chat color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        )

        return (
            <>
                <MyButton onClick={this.handleOpen} tip="Expand Scream!" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <Close/>
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog));