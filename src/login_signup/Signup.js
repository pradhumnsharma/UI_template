import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import cookie from 'react-cookies';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      details:[],
      Userdetails: {},
      confirmation: null
    };
  }
  handleValidation(x,y,z){
    if (x.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && y.match(/^.{2,}$/) && y===z){
        this.setState({
        confirmation: true,
      });
        this.setState({
          Userdetails:{
            Username: x,
            Password: y
          }
        }, function(){
          this.state.details.push(this.state.Userdetails);
          var json_str = JSON.stringify(this.state.details);
          cookie.save('Visitor_details', json_str, {path:'/'}); 
          cookie.save('signup_confirmation', 'true', { path: '/' });
          cookie.save('new_user_entry', this.state.Userdetails, { path: '/' });
        });
    }
    else{
      this.setState({
        confirmation: false
      });
    }
  }
  componentWillMount(){
     if(cookie.load("Visitor_details") !== undefined){
       this.setState({
         details:cookie.load("Visitor_details")
       });   
     }
   }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0 
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(cookie.load("Visitor_details") !== undefined){
      let check = cookie.load("Visitor_details");
       for(var i = 0; i<check.length; i++){
         if(check[i].Username == this.state.email){
           alert("You already have a profile");
         }
         else{
            if(this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0 ){
               return this.handleValidation(this.state.email,this.state.password,this.state.confirmPassword );
            }
         } 
       }
    }
    else{
            if(this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0 ){
               return this.handleValidation(this.state.email,this.state.password,this.state.confirmPassword );
            }
         } 
    // if(this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0 ){
    //    return this.handleValidation(this.state.email,this.state.password,this.state.confirmPassword );
    // }
  }

  render() {
    const isSignedUp = this.state.confirmation;
    let answer; 
    if(this.state.confirmation !== null){
      if(isSignedUp){
        // alert(JSON.stringify(cookie.load("new_user_entry")));
        this.props.history.push("/");
      }
      else{
       answer = <p>Signup failed</p> 
      }  
    }
    return (
      <div className="Signup">
      {answer}
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
              name="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Reenter Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">Signup</Button>
        </form>
      </div>
    );
  }
}