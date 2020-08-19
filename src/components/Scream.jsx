import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const styles = {
    card: {
        display: "flex",
        marginBottom: "20px"
    },
    image: {
        minWidth: "200px"
    },
    content: {
        padding: "25px"
    }
}

class Scream extends Component {
    render() {

        dayjs.extend(relativeTime);

        const {
            classes,
            scream: {
                body, userImg, createdAt,
                userHandle, likeCount, commentCount
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImg} title={"Profile img"} className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={NavLink} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Scream);