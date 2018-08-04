import React, { Component } from 'react';
import './App.css';
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import products from './products.json';
import Productcollection from './products/products';
import Navbar from './customnavbar';
import About from './about';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import cookie from 'react-cookies';
import Login from "login_signup/Login";
import Admin_panel from './admin_panel';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './home';
import Contact from './contact';
import Footer from './footer';
import axios from "axios";

class App extends Component {
  state={
    contents:[]
  }   
  componentWillMount(){
     axios.get('https://ecommerce-angular.herokuapp.com/product_list/')
             .then(resp=>{
                    this.setState({
                        contents:resp.data.data
                    });
                });
  }
  render(){
    // alert("This is called"+JSON.stringify(this.state.contents));
 
    return (
      <div className="App">  
        <Router>
          <Switch className="front-store">
            <Route path="/dashboard" to="/dashboard" component={Dashboard} />
            <Route path="/" to="/" component={(props)=><Home datas={this.state.contents} {...props} />} />
          </Switch>
        </Router>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
