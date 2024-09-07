import { useCartContext } from "../context/Context";
import { actions } from "../reducer/actions";
import styles from "./CartSidebar.module.css";

const CartSidebar = (item) => {
  const { cartDispatch } = useCartContext();
  const { UPDATE_CART } = actions;
  const { id, qty, title, image } = item;

  return (
    <div className={styles.cart_total_wrapper}>
      <div className={styles.cart_product_details}>
        <div>{title}</div>
        <div className={styles.cart_item_img_wrapper}>
          <img className={styles.cart_item_img} src={image} alt={title} />
        </div>
      </div>
      <div className={styles.cart_actions}>
        <button
          className={styles.cart_btn}
          onClick={() =>
            cartDispatch({
              type: UPDATE_CART,
              payload: {
                id,
                type: "decrement",
              },
            })
          }>
          -
        </button>
        <div className={styles.cart_qty}>{qty}</div>
        <button
          className={styles.cart_btn}
          onClick={() =>
            cartDispatch({
              type: UPDATE_CART,
              payload: {
                id,
                type: "increment",
              },
            })
          }>
          +
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
