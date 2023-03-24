 import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {CategoryItem} from "../../store/categories/category.types";
import { FC } from "react";
import { ProductCardContainer } from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
