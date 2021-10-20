import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard/Dashboard';

if (process.env.NODE_ENV==='production') {
    axios.defaults.baseURL = window.location.origin;    
} else {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
}

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact component={Dashboard} path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
