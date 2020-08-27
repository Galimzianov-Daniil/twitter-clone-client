import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../img/NoImg.png";
import Paper from "@material-ui/core/Paper";

const styles = ({ styles }) => ({
    ...styles,
    skeletonProfileImage: {
        width: 200,
        height: 200,
        borderRadius: "50%"
    }
})

class ProfileSkeleton extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={NoImg} alt="profile" className={classes.skeletonProfileImage}/>
                        <input ref={this.input} type="file" onChange={this.handleImageChange} hidden/>
                    </div>
                    <div className="profile-details">
                        <div className={classes.handle}/>
                        <div className={classes.date}/>
                        <div className={classes.fullLine}/>
                        <div className={classes.fullLine}/>
                        <div className={classes.halfLine}/>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ProfileSkeleton);