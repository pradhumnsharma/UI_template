import React from 'react';
import Product from './product';
import {Grid} from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
// import axios from "axios";
import cookies from 'react-cookies';

class Productcollection extends React.Component{ 
    state={

            value: 5,
            value4: {
                min: 0,
                max: 200,
            },
        }
        
        // componentWillMount(){
        //     if(cookies.load('prod') !== null )
        //     {
        //         this.setState({
        //             contents:cookies.load('prod')
        //         });
        //     }
        //     else{
        //         return;
        //     }
        // }
        // componentDidMount(){
        //  axios.get('https://ecommerce-angular.herokuapp.com/product_list/')
        //      .then(resp=>{
        //             this.setState({
        //                 contents:resp.data.data
        //             });
        //             cookies.save('prod', this.state.contents, {path:'/'});
        //         });
        // }
      
render(){

    const x = this.props.allproducts.map((product)=>{ 
        if(parseInt(this.state.value4.min, 10) !== 0 || parseInt(this.state.value4.max, 10) !== 200){
            if(product.product_detail.price <= parseInt(this.state.value4.max, 10) && product.product_detail.price >= parseInt(this.state.value4.min, 10)){
	            return <Product key={product.product_detail.id} 
                name={product.product_detail.name} 
                price={product.product_detail.price} 
                id={product.product_detail.id} 
                quantity={this.props.initialquantity} 
                addtoCart={this.props.addTocart} 
                image={product.product_detail.image} />;
	        }	
        }
		else{
			return <Product key={product.product_detail.id} name={product.product_detail.name} price={product.product_detail.price} id={product.product_detail.id} quantity={this.props.initialquantity} addtoCart={this.props.addTocart} image={product.product_detail.image} />;
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
