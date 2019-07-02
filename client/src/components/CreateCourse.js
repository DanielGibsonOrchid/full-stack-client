import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      validationErrors: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Handle changes to the form inputs */
  handleChange = e => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }

  /* Submit button calls the API POST method */
  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/courses',
      auth: {
        username: window.localStorage.getItem("EmailAddress"),
        password: window.localStorage.getItem("Password"),
      },
      data: {
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded,
      }
    })
    .then( () => {
      this.props.history.push('/');
    })
    /* Catch errors - Check if server error = push to /error page */
    .catch(err => {
      if (err.response.status === 500) {
        console.error('Error fetching and parsing data', err);
        this.props.history.push('/error');
      } else {
        this.setState({ validationErrors: err.response.data.message });
      }
    });
  }

  render() {

    const validationErrors = this.state.validationErrors;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
          {/* If validation errors on the form then display them */}
          {validationErrors ? (
            <div>
              <h2 className="validation--errors--labels">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>{validationErrors}</li>
                </ul>
              </div>
            </div>
          ):''}
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input 
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <p>By {localStorage.FirstName} {localStorage.LastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        onChange={e => this.handleChange(e)}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        onChange={e => this.handleChange(e)}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <Link className="button button-secondary" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;