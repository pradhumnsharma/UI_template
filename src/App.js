import React, { Component } from 'react';
import './App.css';
import products from './products.json';
import Productcollection from './products/products';
import Navbar from './customnavbar';
import About from './about';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import cookie from 'react-cookies';
import Login from "login_signup/Login";
import Admin_panel from './admin_panel';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './home';
import Contact from './contact';
import Footer from './footer';

class App extends Component {
  constructor(){
    super();
    this.state={
      products: products,
      cart:[],
      quantity:1,
      totalAmount: 0   
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);  
    this.countTotal = this.countTotal.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  handleAddToCart(rawdata){
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
    // alert(JSON.stringify(this.state.value4));
    let sam;
    if(this.state.cart.length > 0){
      // sam = (props)=><Cartdrawer data = {this.state.cart} {...props}/>;  
      sam = this.state.cart;
    }
    else{
      sam = 0;
    }
    return (
      <div className="App">  
      
        <Router>
          <div className="front-store">
            <Navbar cartprice = {this.state.totalAmount} data={sam} removesdata={this.handleRemoveProduct}/>
            <Route exact path="/" component={(props)=><Home  allproducts={this.state.products} {...props}/>} />
            <Route exact path="/shop" component={(props) => <Productcollection filterranges={this.state.value4} allproducts={this.state.products} initialquantity={this.state.quantity} addTocart={this.handleAddToCart} {...props}/>} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Login} />
            <Footer />
          </div>
        </Router>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
