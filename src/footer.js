import React, { Component } from 'react';
import {Grid,Col,Row,Button} from 'react-bootstrap';
import './footer.css';
import {Link} from 'react-router-dom';

export default class Footer extends Component{
    constructor(){
        super();
        this.state={
           name:'',
           email:''
        }   
        this.handleValidation = this.handleValidation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleValidation(x,y){
        if (y.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
         this.setState({
            name: x,
            email: y    
        },function(){alert("Data submitted successfully")});
        }
        else{
              alert("Invalid details. Try again!");
        }
    }
  
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.name.length > 0 && this.state.email.length > 0){
            return this.handleValidation(this.state.name,this.state.email);
        }    
    }
	
    render(){
		return(
                 <div className="footer-main">
                 	<Grid>
                 		<Col md={4}>
                 			<h3>Contact Us</h3>
                 			<p>Address: E-74, Blue Street, FL</p>
                 			<p>Toll Free: +1 9256478813</p>
                 			<p>Email: info_developers@gmail.com</p>
                 		</Col>
                 		<Col md={4}>
                 			<ul>
                 			    <li><h3>Site Map</h3></li>
                 				<li><Link to="/">Home</Link></li>
                 				<li><Link to="/shop">Shop</Link></li>
                 				<li><Link to="/contact">Contact Us</Link></li>
                 			</ul>
                 		</Col>
                 		<Col md={4}>
                 			<h3>Newsletter</h3>
                 			<form onSubmit={this.handleSubmit}>
                				<div style={{paddingBottom: '18px'}}>NAME<span > *</span><br/>
                					<input type="text" id="name" value={this.state.name} onChange={this.handleChange} style={{width : '300px'}} className="form-control"/>
                				</div>
                				<div style={{paddingBottom: '18px'}}>EMAIL<span style={{color: 'red'}}> *</span><br/>
                					<input type="email" value={this.state.email} onChange={this.handleChange} id="email" name="data_4" style={{width : '300px'}} className="form-control"/>
                				</div>
                                <Button bsStyle="primary" type="submit">Submit</Button>
							</form>
                 		</Col>
                 	</Grid>
                 </div>
			  );
	}
}