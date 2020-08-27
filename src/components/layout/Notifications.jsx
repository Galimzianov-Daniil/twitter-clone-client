import React, {Component} from 'react';
import MyButton from "../../utils/MyButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {connect} from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Favorite from "@material-ui/icons/Favorite";
import Chat from "@material-ui/icons/Chat";
import MenuItem from "@material-ui/core/MenuItem";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";


class Notifications extends Component {

    state = {
        anchorEl: null,
    }

    handleOpen = (event) => this.setState({ anchorEl: event.currentTarget })
    handleClose = () => this.setState({ anchorEl: null })
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => not.read)
            .map(not => not.notificationId)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        const isNotificationsExist = notifications && notifications.length > 0;
        dayjs.extend(relativeTime);

        let notificationIcon = <NotificationsIcon/>;

        if (isNotificationsExist) {
            const unreadNotifications = notifications.filter(not => not.read === false);
            if (unreadNotifications.length) {
                notificationIcon = (
                    <Badge badgeContent={unreadNotifications.length} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                )
            }
        }

        let notificationsMarkup = isNotificationsExist ? (
            notifications.map(not => {
                const verb = not.type === "like" ? "liked" : "commented on";
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? "primary" : "secondary";
                const icon = not.type === "like" ? (
                    <Favorite color={iconColor}/>
                ) : (
                    <Chat color={iconColor}/>
                )

                return <MenuItem key={not.createdAt} onClick={this.handleClose}>
                    {icon}
                    <Typography
                        component={Link}
                        color="default"
                        variant="body1"
                        to={`/users/${not.recipient}/scream/${not.screamId}`}>
                         {not.sender} {verb} your scream {time}
                    </Typography>
                </MenuItem>

            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>
        )

        return (
            <>
                <MyButton tip="Notifications" onClick={this.handleOpen}>
                    {notificationIcon}
                </MyButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >{notificationsMarkup}</Menu>
            </>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);