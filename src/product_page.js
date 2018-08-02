import React, {Component} from 'react';
import axios from 'axios';
import {Col,Grid, Button} from 'react-bootstrap';
import './product.css';
import Quantity from './products/quantity';
import {Link} from 'react-router-dom';

export default class ProductPage extends Component{
	state={
		contents:[]
	}
	componentDidMount(){
		var data = 0;
		var product_id = Number(this.props.location.pathname.replace(this.props.match.url+'/', ''));
		if(this.props.product_id !== null){
	        data = this.props.product_id; 		
		}
		else{
		    data = product_id;	
		}
	    axios.get('https://ecommerce-angular.herokuapp.com/product_detail/'+data)
		     .then(resp=>{
                    this.setState({
                        contents:resp.data.data
                    });
		        });
	}
    render(){
        return(
    	    <div>
            <h2 className="product-page-heading">Product Detail</h2>
             	<Col md={6} sm={12} xs={12}>
                   {
                        this.state.contents.map((product)=>{
                            return(
                                    <div className="featured-image" key={product.product_detail.id}>{
                                 	    product.image_data.map((image)=>{
                                          return <img src={"https://ecommerce-angular.herokuapp.com"+image.url.url} alt="No image found" />
                                        })
                                 	}   	
                                    </div>
        	                );
  	                    })
                   }       
             	</Col>
             	<Col md={6} sm={12} xs={12}>
                   {
                        this.state.contents.map((product)=>{
                        return(
                                 <div key={product.product_detail.id} className="product-info">	
                                      <h2>Name: {product.product_detail.name}</h2>
                                      <p className="price">Price: ${product.product_detail.price}</p>
                                      
                                      <p className="description">Description: {product.product_detail.description}</p>
                                      <p className="category">Type: {product.category_detail.name}</p>
                                 </div>
        	                    );
  	                  })
                   } 
             	</Col>
            </div>
        );	
    }
}
