import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import './contact.css';
export default class Contact extends Component{
  constructor(){
    super();
    this.state={
        fname:'',
        email:'',
        subject:''
    }
    this.contactHandler=this.contactHandler.bind(this);
    this.changeHandler=this.changeHandler.bind(this);
  }
contactHandler(){
  alert("Thank you for connecting with us.");
  this.props.history.push("/");
}
  changeHandler(event){
    this.setState({
      [event.target.id]:event.target.value  
    });
  }
  render(){
  	return(
               <div className="contact">
               	  <h3>Contact Form</h3>
					<Grid>
					  <form onSubmit={this.contactHandler}>
					    <label for="fname">Full Name</label>
					    <input type="text" id="fname" onChange={this.changeHandler} value={this.state.fname} placeholder="Your name.." />

					    <label for="email">Email Address</label>
					    <input type="text" id="email" onChange={this.changeHandler} value={this.state.email} placeholder="Your email address" />

					    <label for="subject">Message</label>
					    <textarea id="subject" onChange={this.changeHandler} value={this.state.subject} placeholder="Write something.." style={{height:'200px'}}></textarea>
                        
					    <input type="submit" value="Submit" />
					  </form>
					</Grid>
               </div>
  		);
  }
}