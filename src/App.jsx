import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
    return (
            <div className="App">
                <Router>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>
                        </Switch>
                    </div>
                </Router>
            </div>
    );
}

export default App;
