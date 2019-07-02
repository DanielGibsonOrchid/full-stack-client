import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Submit button calls 'handleSignIn' function in app.js */
  handleSubmit = e => {

    const { emailAddress, password } = this.state;
    e.preventDefault();

    this.props.handleSignIn(emailAddress, password);
  };

  /* Handle changes to the form inputs */
  handleChange = e => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }

  render() {
    return (
        
        <div className="bounds">

          {/* If successful login then redirect to previous page */}
          { localStorage.getItem("IsLoggedIn") && (
            this.props.history.goBack()
          )}

          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              {/* Check if there are any validation errors - props info comes from app.js */}
              { this.props.validationError &&  (
              <div>
                <h2 className="validation--errors--label">Validation error</h2>
                <br />
                <div className="validation-errors">
                 <p>{this.props.validationError}</p>
                </div>
              </div>
              )}
              <form onSubmit={this.handleSubmit}>
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
                <div className="grid-100 pad-bottom">
                  <button className="button" type="sumbit">Sign In</button>
                  <Link className="button button-secondary" to="/">Cancel</Link>
                </div>
              </form>
              <p>&nbsp;</p>
              <p>Don't have a user account?
                <Link to="/signup"> Click here </Link>
                to sign up!
              </p>
            </div>
          </div>
        </div>
      )
  }
}

export default UserSignIn;