import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {Col,Row,Button, Table} from 'react-bootstrap';


export default class Admin_panel_main extends Component{
  render(){
    return(
    	<div>
          <h2 className="text-center">Admin Panel</h2>
           	<Col md={12} xs={12}>
           	    <Link to="/admin/add_products"><Button bsStyle="primary">Add Product</Button></Link>
           	</Col>
           	<Col className="col-md-offset-1" md={10} xs={12}>
              <div>
                    <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Type</th>
                          <th>Inventory</th>
                          <th colSpan="3">Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.product_data}
                      </tbody>
                    </Table>

                  </div>
           	</Col>
     	</div>
    );	
  }
  	
}
