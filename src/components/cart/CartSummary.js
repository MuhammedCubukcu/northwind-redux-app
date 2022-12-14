import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";

class CartSummary extends Component {
  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Cart Empty</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Cart
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger" onClick={() => this.props.actions.removeFromCart(cartItem.product)}>X</Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>

            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>Go to Cart</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch){
    return {
        actions: {
           removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);
