import React, { Component } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from  "react-router-dom";
import EditDetails from "./EditDetails";

// Redux
import { connect } from "react-redux";

// MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import {LocationOn, Link as LinkIcon, CalendarToday, Edit, KeyboardReturn} from "@material-ui/icons";
import dayjs from "dayjs";
import {uploadImage, logoutUser} from "../../redux/actions/userActions";
import MyButton from "../../utils/MyButton";
import ProfileSkeleton from "../../utils/ProfileSkeleton.jsx";

const styles = ({ styles }) => ({
    ...styles
});

class Profile extends Component {
    input = React.createRef();

    handleImageChange = event => {
        event.preventDefault();
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData)
    }

    handleLogout = () => this.props.logoutUser();
    handleEditPicture = () => this.input.current.click();

    render() {

        const {
            classes,
            user: {
                credentials: {
                    handle, bio, website, location, imageUrl, createdAt
                },
                loading,
                authenticated
            }
        } = this.props;

        return !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input ref={this.input} type="file" onChange={this.handleImageChange} hidden/>
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} placement="top" btnClassName="button">
                            <Edit/>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2" >{bio}</Typography>}
                        <hr/>
                        {location && (
                            <>
                                <LocationOn color="primary"/>
                                <Typography variant="body2" component="span"> {location}</Typography>
                                <hr/>
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary"/>
                                <Typography
                                    variant="body2"
                                    component="a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={website}
                                > {website}
                                </Typography>
                                <hr/>
                            </>
                        )}
                        <CalendarToday/>
                        <Typography variant="body2" component="span">
                            {" "} {dayjs(createdAt).format("MMM YYYY")}
                        </Typography>
                    </div>
                </div>
                <MyButton tip="Logout" placement="top" onClick={this.handleLogout}>
                    <KeyboardReturn color="primary"/>
                </MyButton>
                <EditDetails/>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" component={Link} to="/login" color="primary">
                        Login
                    </Button>
                    <Button variant="contained" component={Link} to="/signup" color="secondary">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton/>)
    }
}


const mapStateToProps = state => ({
    user: state.user
})

Profile.propTypes = {
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { uploadImage, logoutUser })(withStyles(styles)(Profile));