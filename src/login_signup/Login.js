import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import cookie from 'react-cookies';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmation: null
    };
  }

  // This function will check if entered details are valid or not
  handleValidation(x,y){
    if (x.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && x=='acp@gmail.com'){
      this.setState({
        confirmation: true
      });
      cookie.save('login_confirmation', 'true', { path: '/' });
      cookie.save('username', x, { path: '/' });
      cookie.save('password', y, { path: '/' });
    }
    else{
      alert("Wrong Details");
      this.setState({
        confirmation: false
      });
      cookie.save('login_confirmation', 'false', { path: '/' });
    }
  }

  // This function is to change the button state
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  // This function is to change the input value state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // This function will be called on submit and send data for verification
  handleSubmit = event => {
    event.preventDefault();
    if(this.state.email.length > 0 && this.state.password.length > 0){
       this.handleValidation(this.state.email,this.state.password );
    }
  }

  render() {
    const isLoggedIn = this.state.confirmation;
    let answer; 
    if(isLoggedIn !== null){
      if(isLoggedIn){
       this.props.history.push("/dashboard");
      }
      else{
       answer = <p>Login failed</p> 
      }  
    }
    
    return (
      <div className="Login">
      <span>{answer}</span>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >Login</Button>
          <span><h2 className="text-center">or</h2></span>
          <Link to="/signup">
            <Button block bsStyle="primary"
            bsSize="large"
            type="submit">Signup</Button>
          </Link>
        </form>
      </div>
    );
  }
}