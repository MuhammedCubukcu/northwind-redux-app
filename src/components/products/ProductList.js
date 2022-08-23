import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table, Button} from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions"
import alertify from "alertifyjs"


class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  addToCart = (product) =>{
    this.props.actions.addToCart({quantity : 1,product})
    alertify.success(product.productName + " Added to Cart")
  }
  render() {
    return (
      <div className="mt-5">
        <h3>
          <Badge color="warning">Products</Badge>
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Unit Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map(product => (
                <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button color="info" onClick={() => this.addToCart(product)}>
                    Add To Cart
                  </Button>
                </td>
              </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart:bindActionCreators(cartActions.addToCart, dispatch)
    },
  };
}
export default connect(mapStateToProps, mapDistpatchToProps)(ProductList);
