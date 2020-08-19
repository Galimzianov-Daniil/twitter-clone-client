import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/Scream"

class Home extends Component {
    state = {
        screams: null
    }

    componentDidMount() {
        axios.get("/screams")
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        let recentScreamMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)
        ) : (
            <p>Loading...</p>
        )

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        );
    }
}

export default Home;