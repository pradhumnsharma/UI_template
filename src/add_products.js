import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, FormControl, ControlLabel, Col, Form,Button, Grid, Row} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class Addproducts extends Component{
	constructor(){
		super();
		this.state={
			name:'',
			description:'',
			price:'',
			image: null,
			product_type: '',
      inventry_quantity:0,
      price_type:"$",
      quantity_type:"Kg"
		}
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.uploadHandler =  this.uploadHandler.bind(this);
	}

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  fileChangedHandler = (event) => {
    this.setState({image: event.target.files[0]});
  }

  uploadHandler = (event) => { 
    event.preventDefault();
    var products = new FormData()
    if(this.state.image !== null){
      products.append('products[image]', this.state.image, this.state.image.name)  
    }
    else{
      alert("Please select image");
      return;
    }
    products.append('products[name]', this.state.name)
    products.append('products[description]', this.state.description)
    products.append('products[price]', parseInt(this.state.price, 10))
    products.append('products[product_type]', this.state.product_type)
    products.append('products[inventry_quantity]', parseInt(this.state.inventry_quantity))
    products.append('products[price_type]', this.state.price_type)
    products.append('products[quantity_type]', this.state.quantity_type)
    axios ({
              method: 'post',
              url: 'https://ecommerce-angular.herokuapp.com/add_product',
              data: products,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          }).then(resp=>{
            alert("New product added");
            this.props.history.push("/dashboard");
          });
  }

  render(){
    return(
      <div className="content">
        <Grid fluid>
            <form onSubmit={this.uploadHandler} className="form-horizontal" encType="multipart/form-data">
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="name">Name</label>
                        <div className="col-md-9">
                          <input className="form-control" id="name" type="text" value={this.state.name} onChange={this.handleChange} name="name-input" placeholder="Text" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="price">Price</label>
                        <div className="col-md-9">
                          <input className="form-control" id="price" type="text" value={this.state.price} onChange={this.handleChange} name="price-input" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="product_type">Type</label>
                        <div className="col-md-9">
                          <input className="form-control" id="product_type" type="text" value={this.state.product_type} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="inventry_quantity">Inventory</label>
                        <div className="col-md-9">
                          <input className="form-control" id="inventry_quantity" type="text" value={this.state.inventry_quantity} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="description">Description</label>
                        <div className="col-md-9">
                          <textarea className="form-control" id="description" rows="9" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                      </div> 
                      
                      <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="image">Image</label>
                        <div className="col-md-9">
                          <input className="form-control" id="image" onChange={this.fileChangedHandler} type="file" />
                        </div>
                      </div>
                      <Button type="submit" bsStyle="primary">Add product</Button>
                    </form> 

        </Grid>
      </div>
      ); 
  }
}