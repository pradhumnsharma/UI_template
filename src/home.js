import React, { Component } from 'react';
import {Grid,Col,Row,Button} from 'react-bootstrap';
import axios from "axios";
import {Link} from 'react-router-dom';
import './home.css';

export default class Home extends Component{
    state={
    	contents:[]
    }
	componentDidMount(){
         axios.get('https://ecommerce-angular.herokuapp.com/product_list/')
		     .then(resp=>{
                    this.setState({
                        contents:resp.data.data
                    });
		        });
	}
	render(){
		
		return(
                 <div>
                    <div className="banner">
                        <div id="bannerText">
                           <p>Welcome to Veggies</p>
                           <Button bsStyle="primary"><Link to="/shop">Click To Start Shopping</Link></Button>
                        </div>
                    </div>
                 	<Grid>
                 		<Row>
                 			<Col className="about" md={12}>
                              <h2>About Us</h2>
                              <p>A grocery store or grocer's shop is a retail shop that primarily sells food. A grocer is a bulk seller of food. Grocery stores also offer non-perishable foods that are packaged in bottles, boxes, and cans; some also have bakeries, butchers, delis, and fresh produce.</p>
                 			</Col>
                 			<Col md={12}>
                               <Row className="image-with-text">
                               	  <Col md={6}>
                                      <img src={require('./banner2.jpg')} style={{width:'100%', borderRadius:'5px'}} alt="No image found"/>
                               	  </Col>
                               	  <Col md={6}>
                                      <h3>Our Sources</h3>
                                      <p>Here is a list of 20 healthy protein sources that won't break the bank. Natural Peanut Butter. Peanut butter is full of protein. Eggs. Edamame. Canned Tuna. Plain Greek Yogurt. Sunflower Seeds. Black Beans. Sardines.</p>
                                       <p>However, some people may find healthy protein sources to be too costly. While some sources of protein are expensive, there are also many affordable alternatives.</p>
                 			                              
                               	  </Col>
                               </Row>
                 			</Col>
                 		</Row>
                 	</Grid>
                 </div>
			  );
	}
}