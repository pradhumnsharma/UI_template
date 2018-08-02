import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import './customnavbar.css';
import Quantity from './products/quantity';
import {Col,Row,Button} from 'react-bootstrap';

export default class CustomNavbar extends Component {
   constructor() {
    super();
    this.state = {
      open: false,
      position: 'right',
      noOverlay: true
    };
    this.y=0;
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
    this.acpquantHandler = this.acpquantHandler.bind(this);
  }
  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }
  acpquantHandler(removing_quantity,e){
    this.props.removesdata(removing_quantity,e);
  }
  render() {
    if(this.props.data.length > 0){
      var xxx = this.props.data.map((item)=><Col className="clearfix product" key={item.product_id} md={12} sm={12}>
        <img className="product_image" src={item.product_image} alt="Veggies"/>
        <p className="product_name">{item.product_name}
        <span className="product_price">${item.product_price}</span>
        <span className="product_quantity">{item.product_quantity}</span></p>
        <p className="product_total_value">${item.product_total_value}</p>
        <a href="/" onClick={(e)=> this.acpquantHandler(item.product_id,e)} className="remove">Remove</a></Col>);
    }
    else{
      var xxx = <span className="empty-cart">Your cart is empty</span>;
    }
    return (
      <div>
      <Navbar default collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Veggies</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} componentClass={Link} href="/shop" to="/shop">
              Shop
            </NavItem>
            <NavItem eventKey={5}>
              <span className="cart_price" onClick={this.toggleDrawer} disabled={this.state.open && !this.state.noOverlay}>${this.props.cartprice}</span>
            </NavItem> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}>
          <Button onClick={this.closeDrawer} className="btn btn-success closedrawer">Close</Button>
          <Row>{xxx}</Row>
          <div className="total_amount">Cart Total:- &nbsp;${this.props.cartprice}</div>
        </ReactDrawer>
      </div>
    )
  }
}