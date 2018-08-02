import React from 'react';
import Product from './product';
import {Grid} from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Productcollection extends React.Component{ 
    state={
	        value: 5,
            value4: {
                min: 0,
                max: 200,
            },
        }
render(){
    const x = this.props.allproducts.map((product)=>{ 
        if(parseInt(this.state.value4.min, 10) !== 0 || parseInt(this.state.value4.max, 10) !== 200){
            if(product.price <= parseInt(this.state.value4.max, 10) && product.price >= parseInt(this.state.value4.min, 10)){
	            return <Product key={product.id} name={product.name} price={product.price} id={product.id} quantity={this.props.initialquantity} addtoCart={this.props.addTocart} image={product.image} />;
	        }	
        }
		else{
			return <Product key={product.id} name={product.name} price={product.price} id={product.id} quantity={this.props.initialquantity} addtoCart={this.props.addTocart} image={product.image} />;
		}
    });	
    return(
           <Grid className="main-products">
               <div className="col-md-8 col-md-offset-2">
                   <InputRange
				          maxValue={200}
				          minValue={0}
				          value={this.state.value4}
				          onChange={value => this.setState({ value4: value })}/>
                              <span style={{clear:'both'}}></span>
                </div>
                <div>
                {x}
                </div>
            </Grid>
    	);
 }
} 
	// alert(props.maxranges);
export default Productcollection;
