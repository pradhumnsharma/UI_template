import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import {Link, Route} from 'react-router-dom';
class ProductList extends Component {
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
            <Col md={12}>
              <Card
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.newproducts.map((product, key)=>{
             return(
                        <tr key={product.product_detail.id}>
                  <td>{key+1}</td>
                  <td>{product.product_detail.name}</td>
                  <td>${product.product_detail.price}</td>
                  <td>{product.product_detail.total_avl_qty}</td>
                  <td>{product.category_detail.name}</td>
                  <td><Link to={"/table/product_page/"+product.product_detail.id} onClick={()=>this.showHandler(product.product_detail.id)}>Show</Link></td>
                  <td><Link to={"/table/product_edit_page/"+product.product_detail.id} onClick={()=>this.showHandler(product.product_detail.id)}>Edit</Link></td>
                  <td><a href="/table" onClick={()=>this.deleteHandler(product.product_detail.id)}>Delete</a></td>
          </tr>
              );
    })}
                    </tbody>
                  </Table>
                }
              />
            
            </Col> 
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProductList;
