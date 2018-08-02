import React, {Component} from 'react';
import {Row, Grid, Checkbox} from 'react-bootstrap';

export default class Filters extends Component{
 constructor(){
 	super();
this.state={
  		minrange:0,
      maxrange:200
  }
  this.cartssMin = this.cartssMin.bind(this);
  this.cartssMax = this.cartssMax.bind(this);
 }
  handleChangesMax(event){
    this.setState({
        maxrange: event.target.value
    }, this.cartssMax(event.target.value));
  }
  
  handleChangesMin(event){
    this.setState({
    	minrange: event.target.value
    }, this.cartssMin(event.target.value));
  }
  cartssMin(sx){
     // alert(sx);
  	this.props.minfilter(sx);
  }
  cartssMax(sxz){
       // alert(sxz);
    this.props.maxfilter(sxz);
  }
  render(){
     return(
     	<div>
     	  <form className="col-md-6 col-md-offset-3">
           <label>Price more than {this.state.minrange}</label>
           <input type="range" id="price-min" min="0" max="100" onChange={this.handleChangesMin.bind(this)} value={this.state.minrange} />
               <input type="range" id="price-max" min="0" max="200" onChange={this.handleChangesMax.bind(this)} value={this.state.maxrange} />
               <label>Price less than {this.state.maxrange}</label>
      	  </form>
     	</div>
     	);
  }
}