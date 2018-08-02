import React, {Component} from 'react';
import {Row, Grid} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

import axios from 'axios';
import ProductEditPage from './producteditpage';
import ProductPage from './product_page';
import AdminPanelMain from './admin_panel_main';
import './admin.css';

export default class Admin_panel extends Component{
   constructor(){
    super();
     this.state={newproducts:[],
      deleted:false,
      temp_product_id:null,
      height:''
    }
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showHandler =this.showHandler.bind(this);
   }
    // componentWillMount(){
    //   this.setState({height: window.innerHeight + 'px'});
    // }
    
    componentDidMount(){
    // url: 'http://192.168.1.34:3000/update_product/'+id,
              //url: 'https://ecommerce-angular.herokuapp.com/update_product/'+id, 
      axios.get('https://ecommerce-angular.herokuapp.com/product_list')
    .then(response=>{
           this.setState({
                newproducts: response.data.data
           });
    });
    }
    deleteHandler(id){
        axios ({
              method: 'post',
              url: 'https://ecommerce-angular.herokuapp.com/product_delete/'+id,
              data: id,
              config: { headers: "Access-Control-Allow-Headers"}
          }).then(resp=>{
              console.log(resp);
              this.setState({
                deleted:true
              });

          });
    }
    showHandler(id){
        this.setState({
           temp_product_id:id
        });
    }
  render(){
    // alert(this.state.height);
      const product_data = this.state.newproducts.map((product)=>{
             return(
                        <tr key={product.product_detail.id}>
                  <td>{product.product_detail.name}</td>
                  <td>${product.product_detail.price}</td>
                  <td>{product.product_detail.description}</td>
                  <td>{product.category_detail.name}</td>
                  <td>{product.product_detail.total_avl_qty}</td>
                  <td><Link to={"/admin/product_page/"+product.product_detail.id} onClick={()=>this.showHandler(product.product_detail.id)}>Show</Link></td>
                  <td><Link to={"/admin/product_edit_page/"+product.product_detail.id} onClick={()=>this.showHandler(product.product_detail.id)}>Edit</Link></td>
                  <td><a href="/admin" onClick={()=>this.deleteHandler(product.product_detail.id)}>Delete</a></td>
          </tr>
              );
    });
    // const style={
    //              height: this.state.height, 
    //              position:'absolute', 
    //              width:'200px', 
    //              background:'green',
    //              top:'50px',
    //              paddingTop:'30px',
    //              fontSize:'18px'
    //          }
    // <div style={style}>Hello world</div>
    return(
          <Grid>
                <Row className="admin_panel">          
                  <Route exact path="/admin" component={(props)=><AdminPanelMain product_data = {product_data} {...props}/>} />
                  <Route path="/admin/product_page" component={(props)=> <ProductPage product_id = {this.state.temp_product_id} {...props}/>} />
                  <Route path="/admin/product_edit_page" component={(props)=> <ProductEditPage product_id = {this.state.temp_product_id} {...props}/>} />
                </Row>
          </Grid>
      );
  }
}