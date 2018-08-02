import React, {Component} from 'react';
import './quantity.css';
class Quantity extends Component{
  state={
    value: 1
  }
  quantityDecrement(e){
    if(this.state.value>1){
      this.setState({
        value: this.state.value - 1
      });
    }
    e.preventDefault();
  }
  quantityIncrement(e){
     this.setState({
        value: this.state.value + 1
      });
      e.preventDefault();
  }
componentDidUpdate(){
  this.props.addQuantity(this.state.value);
}
  render(){
    let samm;
    if(this.props.cartdrawerquantity){
      samm = this.props.cartdrawerquantity;
    }
    else{
      samm=this.state.value;
    }
    return (
    <span className="quantity">
      <a className="glyphicon glyphicon-minus" href="#" onClick={this.quantityDecrement.bind(this)}></a>
      <input type="number" value={samm}/>
      <a className="glyphicon glyphicon-plus" href="#" onClick={this.quantityIncrement.bind(this)}></a>
    </span>
    );
  }
}
export default Quantity;
