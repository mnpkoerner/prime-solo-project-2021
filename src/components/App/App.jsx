import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

//my components
import ProtectedAdmin from '../ProtectedAdmin/ProtectedAdmin';
import AdminHome from '../AdminHome/AdminHome';
import AdminEvent from '../AdminEvent/AdminEvent';
import AdminKoan from '../AdminKoan/AdminKoan';
import AdminRecords from '../AdminRecords/AdminRecords';
import Zendo from '../Zendo/Zendo.jsx';
import UserKoan from '../UserKoan/UserKoan';
import UserCalendar from '../UserCalendar/UserCalendar';


import './App.css';
import './Animation.css';
import './ZendoAnimation.css';


//delete this route after demo
// import ZendoBegin from '../ZendoBegin/ZendoBegin'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  //delete attended after set up
  // const attended = 20;

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/zendo/demo"
          >
            <ZendoBegin attended={attended}/>
          </ProtectedRoute> */}

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/zendo"
            // - else shows LandingPage at "/home"
            exact
            path="/zendo"
          >
            <Zendo />
          </ProtectedRoute>
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/zendo"
            // - else shows LandingPage at "/home"
            exact
            path="/user/calendar"
          >
            <UserCalendar />
            </ProtectedRoute>
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/zendo"
            // - else shows LandingPage at "/home"
            exact
            path="/user/koan"
          >
            <UserKoan />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>


          {/* group of protected routes for Admin View */}
          <ProtectedAdmin
            exact
            path="/admin"
          >
            <AdminHome />
          </ProtectedAdmin>
          <ProtectedAdmin
            exact
            path="/admin/event"
          >
            <AdminEvent />
          </ProtectedAdmin>
          <ProtectedAdmin
            exact
            path="/admin/koan"
          >
            <AdminKoan />
          </ProtectedAdmin>
          <ProtectedAdmin
            exact
            path="/admin/records"
          >
            <AdminRecords />
          </ProtectedAdmin>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
