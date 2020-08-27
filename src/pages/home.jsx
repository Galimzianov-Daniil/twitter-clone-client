import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

import Scream from "../components/scream/Scream"
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

import ScreamSkeleton from "../utils/ScreamSkeleton";

class Home extends Component {

    componentDidMount() {
        this.props.getScreams()
    }

    render() {

        const { screams, loading } = this.props.data;

        let recentScreamMarkup = loading ? <ScreamSkeleton/>
            : screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home);