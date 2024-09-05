import {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { initialState, productReducer } from "../reducer/reducer";
import { actions } from "../reducer/actions";
import { fetchProducts } from "../products/product";

const CartContext = createContext(null);

export const useCartContext = () => useContext(CartContext);

export const ContextProvider = ({ children }) => {
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
    <CartContext.Provider value={{ cartState, cartDispatch, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};
