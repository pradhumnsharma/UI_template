import React, {Component} from 'react';
import './quantity.css';

class Quantity extends Component{
  constructor(){
    super();
    this.state={
      value: 1
    },
    this.qq = 0, 
    this.dec = false,
    this.hand=this.hand.bind(this);
  }

  quantityDecrement(e){
    if(this.props.cartquantityinfo){
      this.qq = this.props.cartquantityinfo-1;
      this.dec = true
   }
   this.setState({
        value: this.state.value - 1
      });
   if(this.state.value > 1){
     this.setState({
        value: this.state.value - 1
      });
   }
    e.preventDefault();
  }
  quantityIncrement(e){
    if(this.props.cartquantityinfo){
      this.qq = this.props.cartquantityinfo+1;
    }
     this.setState({
        value: this.state.value + 1
      });
      e.preventDefault();
  }
  hand(event){
    this.setState({
     [event.target.id]:parseInt(event.target.value,10)
    });
  }
componentDidUpdate(prevState){
// alert(this.qq);  
  if(isNaN(this.state.value))
    return;
  else if(this.qq > 0){
    if(this.dec)
      this.props.addQuantityfromCart(this.qq, this.props.productid, this.props.product_price,this.dec);
    else
      this.props.addQuantityfromCart(this.qq, this.props.productid, this.props.product_price,this.dec);
  }
  
}
  render(){
    let samm;
    if(this.props.cartquantityinfo){
      samm=this.props.cartquantityinfo;
    }
    else{
      samm=this.state.value;
    }
    return (
    <span className="quantity">
      <a className="glyphicon glyphicon-minus" href="#" onClick={this.quantityDecrement.bind(this)}></a>
      <input id="value" type="number" onChange={this.hand} value={samm}/>
      <a className="glyphicon glyphicon-plus" href="#" onClick={this.quantityIncrement.bind(this)}></a>
    </span>
    );
  }
}
export default Quantity;
// if(this.props.cartquantityinfo){
//     if(this.dec){
//      this.props.addQuantityfromCart(this.qq, this.props.productid, this.props.product_price,this.dec);  
//     }
//     else{
//          this.props.addQuantityfromCart(this.qq, this.props.productid, this.props.product_price);
//     }
//   }      
//   else{