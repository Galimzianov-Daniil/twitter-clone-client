import React, {Component, Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const styles = ({ styles }) => ({
    ...styles,
    commentImage: {
        width: 100,
        height: 100,
        objectFit: "cover",
        borderRadius: "50%"
    }
})

class Comments extends Component {
    render() {

        const { comments, classes } = this.props;

        return (
            <Grid container>
                {comments.map(comment => {
                    const { body, createdAt, userImg, handle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <hr className={classes.visibleSeparator}/>
                            <Grid container sm={12}>
                                <Grid item sm={3}>
                                    <img src={userImg} alt="comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${handle}`}
                                            color="primary">
                                            @{handle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator}/>
                                        <Typography variant="body1">{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        );
    }
}

export default withStyles(styles)(Comments);