import { useCartContext } from "../context/Context";
import { actions } from "../reducer/actions";
import styles from "./Product.module.css";

const Product = (item) => {
  const { ifProductInCart, cartDispatch } = useCartContext();

  const { ADD_TO_CART, REMOVE_FROM_CART } = actions;
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
      {ifProductInCart(id) ? (
        <button
          className={`${styles.cart_btn} ${styles.cart_btn_remove}`}
          onClick={() => {
            cartDispatch({
              type: REMOVE_FROM_CART,
              payload: {
                id,
              },
            });
          }}>
          Remove from Cart
        </button>
      ) : (
        <button
          className={`${styles.cart_btn} ${styles.cart_btn_add}`}
          onClick={() => {
            cartDispatch({
              type: ADD_TO_CART,
              payload: item,
            });
          }}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
