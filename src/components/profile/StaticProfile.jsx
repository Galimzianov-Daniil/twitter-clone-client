import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import {CalendarToday, Link as LinkIcon, LocationOn} from "@material-ui/icons";
import MuiLink from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import dayjs from "dayjs";

const styles = {
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    },
    paper: {
        padding: 20
    }
};

class StaticProfile extends Component {
    render() {

        const {
            classes,
            profile: { handle, bio, website, location, imageUrl, createdAt }
        } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
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
                                <Typography variant="body2" component="span">{location}</Typography>
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
                                    rel="noopener noreferrer">
                                    {website}
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
            </Paper>
        );
    }
}

export default withStyles(styles)(StaticProfile);