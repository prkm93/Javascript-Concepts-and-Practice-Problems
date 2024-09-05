import { useCartContext } from "../context/Context";
import Product from "./Product";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartState, isLoading } = useCartContext();
  return (
    <div>
      <h1>My Shopping Cart</h1>
      <div className={styles.wrapper}>
        <div className={styles.product_container}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            cartState.productList?.map((item) => {
              return <Product key={item?.id} {...item} />;
            })
          )}
        </div>
        <hr />
        <div className={styles.cart_container}>
          <h2>Cart</h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
