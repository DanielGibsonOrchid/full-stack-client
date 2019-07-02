// App.js is a container for all other components and manages routing

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  /* Keeps global state in App component - instead of React Context API
  * After user signs-in this update props and make them available to pass down to all other components */

  constructor() {
    super();
    this.state = {
      //Hold state for validation on sign-in
      validationError: '',
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  /* Called from UserSignIn component - handles the sign-in process */
  handleSignIn(username, password, props) {
    axios.get("http://localhost:5000/api/users", {
      auth: {
        username: username,
        password: password,
      }
    })
    /* If authentication is successful - Store user data in the browser */
    .then(res => { 
      window.localStorage.setItem('FirstName',res.data.firstName)
      window.localStorage.setItem('LastName', res.data.lastName)
      window.localStorage.setItem('EmailAddress', username)
      window.localStorage.setItem('Password', password)
      window.localStorage.setItem('UserId', JSON.stringify(res.data.id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      // window.location.assign('/')

      /* Clear validation errors from sign-in form */
      this.setState({ validationError: '' })
    })

    /* Catch errors - Check if server error = push to /error page */
    .catch(err => {
      if (err.response.status === 401) {
        /* Status 401 = unauthorized access - must be a validation error */
        this.setState ({validationError: err.response.data.message })
      } else {
        /* If not a 401 validation error then it must be a server error */
        console.error('Error fetching and parsing data', err);
        this.props.history.push('/error');
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="root">
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourse} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />

            {/* Pass handleSignIn, validationErrors, and props through to UserSignIn component*/}
            <Route exact path="/signin" component={ (props) => <UserSignIn
              handleSignIn={this.handleSignIn} 
              validationError={this.state.validationError}
              {...props} /> 
            } />

            <Route exact path="/signup" component={ (props) => <UserSignUp
              handleSignIn={this.handleSignIn}
              {...props} /> 
            } />

            <Route exact path="/signout" component={UserSignOut} />

            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/error" component={UnhandledError} />

            {/* If any route doesn't match the above then route to NotFound component */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>    
    );
  }
}

export default App;