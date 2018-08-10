import React, {Component} from 'react';
import './cart.css';
import Quantity from './products/quantity';
import {Link} from 'react-router-dom';
export default class Cart extends Component{
	constructor(){
		super();
		this.state={
			quantityvalue:1
		}
		   this.cartpageremoveHandler = this.cartpageremoveHandler.bind(this);
		   this.quantitychangeHandler = this.quantitychangeHandler.bind(this);
		   this.quantityHandlerIncrement=this.quantityHandlerIncrement.bind(this);
		   this.quantityHandlerDecrement=this.quantityHandlerDecrement.bind(this);
	}
	// quantitychangeHandler(cartquantity, ids, totprice, decrem){
	// 	if(decrem){
 //             this.props.quantityHandler(cartquantity, ids, totprice, decrem);
	// 	}
	// 	else{
	// 	  this.props.quantityHandler(cartquantity, ids, totprice);	
	// 	}
	// }
	quantityHandlerDecrement(e){
       this.setState({
       	  quantityvalue:this.state.quantityvalue-1
       });
	}
	cartpageremoveHandler(removing_quantity,e){
    this.props.removesdata(removing_quantity,e);
  }
	render(){
		let cart_item;
		let styles; 
		if(this.props.data.length > 0){
			cart_item=this.props.data.map((item)=>{
                          return (
                                 <tr>
							<td data-th="Description">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img src="https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg" alt="..." class="img-responsive"/></div>
									<div class="col-sm-10 description">
										<h4 class="nomargin">{item.product_name}</h4>
										<p>{item.product_description}</p>
									</div>
								</div>
							</td>
							<td data-th="Price"><span>${item.product_price}</span></td>
							<td data-th="Quantity">
							 <a className="glyphicon glyphicon-minus" href="#" ></a>
      <input onChange={this.quantityHandlerDecrement} id="value" class="form-control text-center" style={{margin:'0 auto'}} type="number" />
      <a className="glyphicon glyphicon-plus" href="#"></a>
								
							</td>
							<td data-th="Subtotal" class="lg--text-center"><span>${item.product_total_value}</span></td>
							<td class="actions" data-th="">
								<button onClick={(e)=>this.cartpageremoveHandler(item.product_id,e)} class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
							</td>
						</tr>
                          	);
						})
		} 
		else{
			 styles={
				padding:'20px 0px',
				fontSize:'16px',
                textAlign:'center'
			}
			cart_item = "Your cart is empty";
		}
      return(
               <div class="container" id="cart-page">
	<table id="cart" class="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style={{width:"50%"}}>Description</th>
							<th style={{width:"10%"}}>Price</th>
							<th style={{width:"15%"}}>Quantity</th>
							<th style={{width:"15%"}}>Subtotal</th>
							<th style={{width:"10%"}}></th>
						</tr>
					</thead>
					<tbody style={styles}>
					{
					cart_item
					}
						
					</tbody>
					<tfoot>
						<tr class="visible-xs">
							<td class="text-center"><strong>Total:- ${this.props.cartprice}</strong></td>
						</tr>
						<tr>
							<td><Link to="/shop" href="/shop" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</Link></td>
							<td colSpan="2" class="hidden-xs"></td>
							<td class="hidden-xs text-center"><strong>Total ${this.props.cartprice}</strong></td>
							<td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
</div>
      	);
	}
}
// <input type="number" style={{margin:'0 auto'}} class="form-control text-center" value={item.product_quantity} />
// 				<button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>


// <Quantity productid={item.product_id}
// 								cartquantityinfo={item.product_quantity} addQuantityfromCart={this.quantitychangeHandler}
// 								product_price={item.product_price} />