import React, {Component} from 'react';
import Scream from "../components/scream/Scream";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { withRouter } from "react-router-dom";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

class user extends Component {
    state = {
        profile: null,
        screamId: null
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) this.setState({ screamId })

        this.props.getUserData(handle)
            .then(user => {
                this.setState({ profile: user })
            })
    }

    render() {
        const { screams, loading } = this.props.data;
        const { screamId } = this.state;

        const screamsMarkup = loading ? (
            <ScreamSkeleton/>
        ) : screams === null ? (
            <p>No screams</p>
        ) : (
            screams.map(scream =>
                <Scream
                    key={scream.screamId}
                    scream={scream}
                    openDialog={scream.screamId === screamId}
                />
            )
        )

        const profileMarkup = loading || !this.state.profile ? <ProfileSkeleton/> :
            <StaticProfile profile={this.state.profile}/>

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profileMarkup}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
})

export default withRouter(connect(mapStateToProps, { getUserData })(user));