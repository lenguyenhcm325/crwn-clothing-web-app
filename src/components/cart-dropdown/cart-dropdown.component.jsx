import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  // console.log("this is cartItems");
  // console.log(cartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

// import { useContext } from "react";

// import { CartContext } from "../../contexts/cart.context";

// import Button from "../button/button.component";
// import CartItem from "../cart-item/cart-item.component";

// import "./cart-dropdown.styles.scss";

// const CartDropdown = () => {
//   const { cartItems } = useContext(CartContext);

//   return (
//     <div className="cart-dropdown-container">
//       <div className="cart-items">
//         {cartItems.length ? (
//           cartItems.map((cartItem) => (
//             <CartItem key={cartItem.id} cartItem={cartItem} />
//           ))
//         ) : (
//           <span className="empty-message">Your cart is empty</span>
//         )}
//       </div>
//       <Button>GO TO CHECKOUT</Button>
//     </div>
//   );
// };

// export default CartDropdown;
