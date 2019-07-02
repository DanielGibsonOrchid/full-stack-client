import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      validationErrors: [],
      emailInUseError: '',
      passwordsNotMatching: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Submit button checks if password and confirm password fields match
  * If true then run 'handleSignUp' function */
  handleSubmit = (e) => {
    const { password, confirmPassword } = this.state 
    e.preventDefault();
    if(password === confirmPassword) {
      this.setState ({ passwordsNotMatching: false })
      this.handleSignUp();
    } else {
      this.setState ({ passwordsNotMatching: true })
    }
  }

  /* calls API POST method to create a new user */
  handleSignUp = () => {

    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users/',
      data: {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
      }
    })
    .then(() => {

      {/* After successful sign-up then call handleSignIn function to automatically sign-in the new user */}
      this.props.handleSignIn(emailAddress, password);
      
    })
    /* Catch errors - Check if server error = push to /error page */
    .catch(err => {
      if (err.response.status === 500) {
        console.error('Error fetching and parsing data', err);
        this.props.history.push('/error');

      /* If error message is email is already in use */
      } else if (err.response.data.message) {
        this.setState ({ emailInUseError: err.response.data.message })
      /* If error message is about validation errors */
      } else {
        this.setState({ validationErrors: err.response.data.errors })
      }
    });
  }

  /* Handle changes to the form inputs */
  handleChange = (e) => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }

  render() {

    const { validationErrors, emailInUseError, passwordsNotMatching } = this.state

    return (
      <div className="bounds">

        {/* If successful signup then redirect to homepage */}
        { localStorage.getItem("IsLoggedIn") && (
            this.props.history.push('/')
        )}

        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <div className="validation-errors">
              <ul>
                {/* Checks if there are any validation errors */}
                { validationErrors ? (
                  validationErrors.map((err) =>
                    <li key={err.toString()}>{err}</li>
                  )
                ) :''}
                { passwordsNotMatching ? (
                  <li>Passwords are not matching</li>
                ) :''}
                {emailInUseError ? (
                  <li>{emailInUseError}</li>
                ) : ''}
              </ul>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  className=""
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  className=""
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  className=""
                  placeholder="Email Address"
                  value={this.state.emailAddress}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div>
                <input 
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div>
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="sumbit">Sign Up</button>
                <Link className="button button-secondary" to="/">Cancel</Link>
              </div>
            </form>
            <p>&nbsp;</p>
            <p>Already have a user account?
              <Link to="/signin"> Click here </Link>
              to sign in!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignUp;