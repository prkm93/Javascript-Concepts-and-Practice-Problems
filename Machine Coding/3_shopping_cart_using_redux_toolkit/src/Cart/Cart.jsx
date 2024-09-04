import { useState, useEffect, useReducer } from "react";
import { productReducer, initialState } from "../reducer/reducer";
import { actions } from "../reducer/actions";
import { fetchProducts } from "../products/product";
import Product from "./Product";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cartState, cartDispatch] = useReducer(productReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { GET_PRODUCT } = actions;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts(
        "http://www.shoppingproducts.com/products"
      );
      cartDispatch({
        type: GET_PRODUCT,
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("cartState", cartState);

  return (
    <div>
      <h1>My Shopping Cart</h1>
      <div className={styles.product_container}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          cartState.productList?.map((item) => {
            return <Product key={item?.id} {...item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
