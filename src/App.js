import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard";

// Optional: implement this later
const AppWrapper = () => {
    const location = useLocation();

    // Conditionally show navbar
    const hideNavbarPaths = ['/login', '/register'];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname.toLowerCase());

    // Conditionally add full-height class
    const isFullHeightPage = ['/', '/dashboard'].includes(location.pathname.toLowerCase());

    useEffect(() => {
        if (isFullHeightPage) {
            document.body.classList.add('full-height');
        } else {
            document.body.classList.remove('full-height');
        }
    }, [location.pathname, isFullHeightPage]);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;
