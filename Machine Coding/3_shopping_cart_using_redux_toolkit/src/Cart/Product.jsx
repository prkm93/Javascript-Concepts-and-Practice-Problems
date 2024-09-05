import { useCartContext } from "../context/Context";
import { actions } from "../reducer/actions";
import styles from "./Product.module.css";

const Product = (item) => {
  const { cartDispatch } = useCartContext();

  const { ADD_TO_CART } = actions;
  const { id, title, image, price, rating } = item;

  return (
    <div key={id} className={styles.product_card}>
      <div>{title}</div>
      <div className={styles.product_img_block}>
        <img className={styles.product_img} src={image} alt={title} />
      </div>
      <div className={styles.product_details}>
        <div>
          <strong>Price:</strong> ${price}
        </div>
        <div>
          <strong>Ratings:</strong> {rating.count}
        </div>
        <div>
          <strong>Rate:</strong> {rating.rate}
        </div>
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
