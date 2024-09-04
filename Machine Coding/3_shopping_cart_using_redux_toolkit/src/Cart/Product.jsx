import { useReducer } from "react";
import { productReducer, initialState } from "../reducer/reducer";
import { actions } from "../reducer/actions";
import styles from "./Product.module.css";

const Product = (item) => {
  const [cartState, cartDispatch] = useReducer(productReducer, initialState);
  const { ADD_TO_CART } = actions;
  const { id, title, image, price, rating, description } = item;

  return (
    <div key={id} className={styles.product_card}>
      <div>{title}</div>
      <div className={styles.product_img_block}>
        <img className={styles.product_img} src={image} alt={title} />
      </div>
      <div>
        <div>
          <strong>Price:</strong> ${price}
        </div>
        <div>
          <strong>Rating Count:</strong> {rating.count}
        </div>
        <div>
          <strong>Rate:</strong> {rating.rate}
        </div>
        <div>{description.slice(0, 250)}...</div>
      </div>
      <button
        className={styles.cart_btn}
        onClick={() => {
          cartDispatch({
            type: ADD_TO_CART,
            payload: item,
          });
        }}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
