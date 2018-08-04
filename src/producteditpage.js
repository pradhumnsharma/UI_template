import React, {Component} from 'react';
import {Col,Button} from 'react-bootstrap';
import axios from 'axios';

export default class ProductEditPage extends Component{
	constructor(){
    super();
    this.state={
        single_product_id:0,
        contents:[],
        touched:false,
        name:'',
        description:'',
        price:'',
        image: null,
        product_type: '',
        inventry_quantity:0,
        price_type:"$",
        quantity_type:"Kg",
        delete_image:false
    },
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

	handleImageChange(){
	    this.setState({
      	    delete_image:true
        });	
	}
	handleChange = event => {
      this.setState({
      	touched:true,
        [event.target.id]: event.target.value
      });
    }

  fileChangedHandler = (event) => {
    this.setState({image: event.target.files[0]});
  }

  uploadHandler = (event, id) => {
    alert(id);
    event.preventDefault();
    var products = new FormData()
    if(this.state.image !== null){
      products.append('products[image]', this.state.image, this.state.image.name)  
    }
     else{
      alert("Please select image");
      return;
    }
    products.append('products[name]', this.state.name)
    products.append('products[description]', this.state.description)
    products.append('products[price]', parseInt(this.state.price, 10))
    products.append('products[product_type]', this.state.product_type)
    products.append('products[inventry_quantity]', parseInt(this.state.inventry_quantity))
    products.append('products[price_type]', this.state.price_type)
    products.append('products[quantity_type]', this.state.quantity_type)
    products.append('products[delete_image]', this.state.delete_image)
    axios ({
              method: 'post',
              url: 'https://ecommerce-angular.herokuapp.com/update_product/'+id,
              data: products,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          }).then(resp=>{
            alert('Product edited successfully');
            this.props.history.push('/dashboard');
          });
  }
    componentDidMount(){
		var data = 0;
		var product_id = Number(this.props.location.pathname.replace(this.props.match.url+'/', ''));
		if(this.props.product_id !== null){
	        data = this.props.product_id; 		
		}
		else{
		    data = product_id;	
		}
		this.setState({
	        	single_product_id:data
	        })
	    axios.get('https://ecommerce-angular.herokuapp.com/product_detail/'+data)
		     .then(resp=>{
                    this.setState({
                        contents:resp.data.data
                    });
                    resp.data.data.map((product)=>{
                      if(this.state.name === ''){
                        this.setState({
                           name:product.product_detail.name,
                           description:product.product_detail.description,
                           price:product.product_detail.price,
                           product_type: product.category_detail.name,
                           inventry_quantity:product.product_detail.total_avl_qty
                        })
                      }
                    });
		        });
	}
    render(){
    	const alldata=this.state.contents.map((product)=>{
    		return(
    			        <form key={product.product_detail.id} onSubmit={(e)=>this.uploadHandler(e, product.product_detail.id)} class="form-horizontal" action="" method="post" encType="multipart/form-data">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="name">Name</label>
                        <div class="col-md-9">
                          <input class="form-control" id="name" type="text" value={this.state.touched ? this.state.name : product.product_detail.name} onChange={this.handleChange} name="name-input" placeholder="Text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="price">Price</label>
                        <div class="col-md-9">
                          <input class="form-control" id="price" type="text" value={this.state.touched ? this.state.price : product.product_detail.price} onChange={this.handleChange} name="price-input" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="product_type">Type</label>
                        <div class="col-md-9">
                          <input class="form-control" id="product_type" type="text" value={this.state.touched ? this.state.product_type : product.category_detail.name} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="inventry_quantity">Inventory</label>
                        <div class="col-md-9">
                          <input class="form-control" id="inventry_quantity" type="text" value={this.state.touched ? this.state.inventry_quantity : product.product_detail.total_avl_qty} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="description">Description</label>
                        <div class="col-md-9">
                          <textarea class="form-control" id="description" rows="9" value={this.state.touched ? this.state.description : product.product_detail.description} onChange={this.handleChange}></textarea>
                        </div>
                      </div> 
                      <div>
                            {
                              product.image_data.map((image)=>{
                                 return <img style={{width: '200px', margin:'0 auto'}} src="https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg" alt="No image found" />
                                 // return <img style={{width: '200px', margin:'0 auto'}} src={"https://ecommerce-angular.herokuapp.com"+image.url.url} alt="No image found" />
                            })}   
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="image">Image</label>
                        <div class="col-md-9">
                          <input class="form-control" id="image" type="file" onChange={this.fileChangedHandler} />
                        </div>
                      </div>
                       <div class="form-group row">
                        <label class="col-md-3 col-form-label" for="delete_image">Do you want to delete old images?</label>
                        <div class="col-md-9">
                          <input class="form-control" id="delete_image" type="checkbox" onChange={this.handleImageChange}/>
                        </div>
                      </div>
                      <Button type="submit" bsStyle="primary">Edit product</Button>
                    </form>
    			     );
          });
    return(
           	<Col md={12} sm={12} xs={12}>
                  {alldata} 
          	</Col>
          );	
  }
  	
}
