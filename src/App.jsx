import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import themeConfig from "./utils/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./utils/AuthRoute";

// Mui
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import * as axios from "axios"

axios.defaults.baseUrl =
    "https://us-central1-twitter-clone-bf6fc.cloudfunctions.net/api";

const theme = createMuiTheme(themeConfig)

const token = localStorage.FBIdToken;

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 <= Date.now()) {
        store.dispatch(logoutUser())
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED })
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.FBIdToken = token;
        store.dispatch(getUserData())
    }
}

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                            <Navbar/>
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={home}/>
                                    <Route exact path="/users/:handle" component={user}/>
                                    <Route exact path="/users/:handle/scream/:screamId" component={user}/>
                                    <AuthRoute exact path="/login" component={login}/>
                                    <AuthRoute exact path="/signup" component={signup}/>
                                </Switch>
                            </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
