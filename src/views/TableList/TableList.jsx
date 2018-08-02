import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import ProductEditPage from '../../producteditpage';
import ProductPage from '../../product_page';
import {Link, Route} from 'react-router-dom';
import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import ProductList from './ProductList';
class TableList extends Component {
  constructor(){
    super();
     this.state={
      newproducts:[],
      deleted:false,
      temp_product_id:null,
      height:''
    }, 
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showHandler =this.showHandler.bind(this);
   }
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
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Route exact path="/table" component={ProductList} />
            <Route path="/table/product_page" component={(props)=> <ProductPage product_id = {this.state.temp_product_id} {...props}/>} />
                  <Route path="/table/product_edit_page" component={(props)=> <ProductEditPage product_id = {this.state.temp_product_id} {...props}/>} />
            
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
