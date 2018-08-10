import React, { Component } from 'react';
import Navbar from './customnavbar';
import {Grid,Col,Row,Button} from 'react-bootstrap';
import axios from "axios";
import {Link} from 'react-router-dom';
import './home.css';

import Cart from './cart';
import products from './products.json';
import Productcollection from './products/products';

import About from './about';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import cookie from 'react-cookies';
import Login from "login_signup/Login";
import Admin_panel from './admin_panel';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewHome from './newhome';
import Contact from './contact';
import Footer from './footer';
export default class Home extends Component{

    constructor(){
    super();
    this.state={
      contents:[],
      products: products,
      cart:[],
      quantity:1,
      totalAmount: 0   
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);  
    this.countTotal = this.countTotal.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.quantityHandler=this.quantityHandler.bind(this);
  }

  handleAddToCart(rawdata){
    alert(JSON.stringify(rawdata));
    let cartItem = this.state.cart;
    let productID = rawdata.product_id;
    let productQty = rawdata.product_quantity;
    let productTotalValue = rawdata.product_total_value;
    if(this.checkProduct(productID)){
      let index = cartItem.findIndex((x => x.product_id === productID));
      cartItem[index].product_quantity = cartItem[index].product_quantity + productQty;
      cartItem[index].product_total_value = cartItem[index].product_total_value + productTotalValue;
      this.setState({
        cart: cartItem
      },this.countTotal(this.state.cart))
    } 
    else {
      cartItem.push(rawdata);
      this.setState({
        cart: cartItem
      },this.countTotal(this.state.cart))
    }
  }
  quantityHandler(a,b,c,d){
    // alert(a+"  "+b+"  "+c+"  "+d);

    let cartItem = this.state.cart;
    let productID = b;
    let productQty = a;
    let productTotalValue = c;
    if(this.checkProduct(productID)){
      if(d){
              let index = cartItem.findIndex((x => x.product_id === productID));
              cartItem[index].product_quantity = cartItem[index].product_quantity - 1;
              cartItem[index].product_total_value = cartItem[index].product_total_value - productTotalValue;
              this.setState({
                cart: cartItem
              },this.countTotal(this.state.cart))  
      }
      else{
        let index = cartItem.findIndex((x => x.product_id === productID));
      cartItem[index].product_quantity = cartItem[index].product_quantity + 1;
      cartItem[index].product_total_value = cartItem[index].product_total_value + productTotalValue;
      this.setState({
        cart: cartItem
      },this.countTotal(this.state.cart))  
      }
      
    }
  }
  handleRemoveProduct(id, e){
    e.preventDefault();
    let cart = this.state.cart;
    let index = cart.findIndex((x => x.product_id == id));
    cart.splice(index, 1);
    this.setState({
      cart: cart
    },this.countTotal(this.state.cart))
  }

  checkProduct(productID){
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.product_id === productID;
    }); 
  }

  countTotal(){
    let total = 0;
    let cart = this.state.cart;
    cookie.save('cartdata', cart, {path:'/'});
    for (var i=0; i<cart.length; i++) {
      total += cart[i].product_price * parseInt(cart[i].product_quantity, 10);
    }
    this.setState({
      totalAmount: total
    })
    cookie.save("Cart_Total", total, {path:'/'});
  }

  componentWillMount(){
    if(cookie.load("Cart_Total") !== undefined){
      this.setState({
        totalAmount: cookie.load("Cart_Total"),
        cart:cookie.load('cartdata')
      })
    }

  }
  minFiltervaluesHandler(range){
     this.setState({
        filterrangemin: range
     });
  }
  maxFiltervaluesHandler(range){
     this.setState({
        filterrangemax: range
     });
  }
	
	render(){
    let allproduct = [];
if(this.state.contents.length > 0){

    allproduct=this.state.contents;

  }
  else{
    allproduct=this.state.products;}
		let sam;
    if(this.state.cart.length > 0){
      // sam = (props)=><Cartdrawer data = {this.state.cart} {...props}/>;  
      sam = this.state.cart;
    }
    else{
      sam = 0;
    }
		return(
              <Router>
                 <div>
                  <Navbar cartprice = {this.state.totalAmount} data={sam} removesdata={this.handleRemoveProduct}/>
                  <Route exact path="/" component={NewHome}/>
                  <Route exact path="/shop" component={(props) => <Productcollection filterranges={this.state.value4} allproducts={this.props.datas} initialquantity={this.state.quantity} addTocart={this.handleAddToCart} {...props}/>} />  
                  <Route path="/about" component={About} />
                  <Route path="/cart" component={(props)=> <Cart cartprice = {this.state.totalAmount} quantityHandler={this.quantityHandler}  data={sam} removesdata={this.handleRemoveProduct} {...props}/>} />
                  <Route path="/contact" component={Contact} />
                  <Footer />
                 </div>
              </Router>
			  );
	}
}

// <Navbar cartprice = {this.state.totalAmount} data={sam} removesdata={this.handleRemoveProduct}/>
//             <Route path="/app" component={(props)=><Home  allproducts={this.state.products} {...props}/>} />
//             <Route exact path="/shop" component={(props) => <Productcollection filterranges={this.state.value4} allproducts={this.state.products} initialquantity={this.state.quantity} addTocart={this.handleAddToCart} {...props}/>} />
//             <Route path="/about" component={About} />
//             <Route path="/contact" component={Contact} />
//             <Route path="/admin" component={Login} />
//             