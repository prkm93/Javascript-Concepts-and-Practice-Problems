import { useCartContext } from "../context/Context";
import Product from "./Product";
import styles from "./Cart.module.css";
import CartSidebar from "./CartSidebar";

const Cart = () => {
  const { cartState, isLoading } = useCartContext();

  const currencyFormatter = (amount) => {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };
  const cartTotalAmount = cartState.cartList.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  return (
    <div>
      <h1>My Shopping Cart</h1>
      <div className={styles.wrapper}>
        <div className={styles.product_container}>
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            cartState.productList?.map((item) => {
              return <Product key={item?.id} {...item} />;
            })
          )}
        </div>
        <hr className={styles.cart_divider} />
        {cartState.cartList.length > 0 && (
          <div className={styles.cart_container}>
            <h2>Cart</h2>
            {cartState.cartList?.map((item) => {
              return <CartSidebar key={item.id} {...item} />;
            })}
            <div>
              <h2>Cart Total</h2>
              <hr className={styles.cart_total_divider} />
              {cartState.cartList.map((item) => {
                return (
                  <div key={item.id} className={styles.cart_total_section}>
                    <div>{item.title}</div>
                    <div>{currencyFormatter(item.price * item.qty)}</div>
                  </div>
                );
              })}
              <hr className={styles.cart_total_divider} />
              <div className={styles.cart_total_amount}>
                <div>Total</div>
                <div>{currencyFormatter(cartTotalAmount)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
