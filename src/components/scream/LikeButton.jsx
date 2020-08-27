import React, {Component} from 'react';
import MyButton from "../../utils/MyButton";
import {Link} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import { connect } from "react-redux";
import {likeScream, unlikeScream} from "../../redux/actions/dataActions";

class LikeButton extends Component {

    likeScream = () => this.props.likeScream(this.props.screamId)
    unlikeScream = () => this.props.unlikeScream(this.props.screamId)

    isLiked = () => {
        return !!(this.props.likes && this.props.likes.find(like =>
            like.screamId === this.props.screamId));
    }

    render() {

        return !this.props.authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
                </MyButton>
            </Link>
        ) : (
            this.isLiked() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <Favorite color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )

    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    likes: state.user.likes,
})

export default connect(mapStateToProps, { likeScream, unlikeScream })(LikeButton);