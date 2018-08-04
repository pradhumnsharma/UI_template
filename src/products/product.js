import React, {Component} from 'react';
import {Col, Image, Button} from 'react-bootstrap';
import './product.css';
import Quantity from './quantity';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Product extends Component{
constructor(){
  super();
    this.state={
      q:1,
      selectedProducts:{},
      yy: false
    }
    this.x = this.state.q;
    this.addCart = this.addCart.bind(this);
  }
  quantHandler(qty){
    if(this.x !== qty){
      this.setState({
        yy:true
      });
    }
    this.x=qty;
  }

  addCart(price, id, image, name){
    if(this.state.yy){
      toast(name+ " is updated in your cart",{ autoClose: 2000, position: toast.POSITION.TOP_CENTER});  
    }else{
      toast(name+ " is added in your cart",{ autoClose: 2000, position: toast.POSITION.TOP_CENTER});  
    }
    
  this.setState({
    selectedProducts:{
        product_price:price,
        product_id:id,
        product_quantity:this.x,
        product_image:image,
        product_name:name,
        product_total_value: price*this.x
      }
  }, function(){this.props.addtoCart(this.state.selectedProducts);});
  
  }
  render(){

    return(
      <Col md={3} sm={6} xs={12} className="product">
        <Image src="https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg" alt="No product" className="product-image"/>
        <p>{this.props.name}</p>
        <p className="clearfix main-data"><span style={{float:'left'}}>$&nbsp;{this.props.price}</span><Quantity addQuantity={this.quantHandler.bind(this)}/></p>
          <Button bsStyle="primary" onClick={()=>{this.addCart(this.props.price, this.props.id, this.props.image, this.props.name)}}>Add To Cart</Button>       
      </Col>
    );
  }
}

export default Product;
