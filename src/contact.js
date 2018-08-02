import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import './contact.css';
export default class Contact extends Component{
  state={
  	fname:'',
  	email:'',
  	subject:''
  }
  render(){
  	return(
               <div className="contact">
               	  <h3>Contact Form</h3>
					<Grid>
					  <form onSubmit="">
					    <label for="fname">Full Name</label>
					    <input type="text" id="fname" name="name" placeholder="Your name.." />

					    <label for="email">Email Address</label>
					    <input type="text" id="email" name="email" placeholder="Your email address" />

					    <label for="subject">Message</label>
					    <textarea id="subject" name="subject" placeholder="Write something.." style={{height:'200px'}}></textarea>
                        
					    <input type="submit" value="Submit" />
					  </form>
					</Grid>
               </div>
  		);
  }
}