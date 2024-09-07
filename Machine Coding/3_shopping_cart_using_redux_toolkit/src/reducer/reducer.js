import { actions } from "./actions";

export const initialState = {
  productList: [],
  cartList: [],
};

const { GET_PRODUCT, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } = actions;

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT: {
      return { ...state, productList: payload };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartList: [...state.cartList, { ...payload, qty: 1 }],
      };
    }
    case REMOVE_FROM_CART: {
      const filteredCart = state.cartList.filter(
        (item) => Number(item.id) !== Number(payload.id)
      );
      console.log("filteredCart", filteredCart);
      return {
        ...state,
        cartList: filteredCart,
      };
    }
    case UPDATE_CART: {
      let updatedCartList;

      if (payload.type === "increment") {
        updatedCartList = state.cartList.map((item) => {
          if (payload.id === item.id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        });
      } else if (payload.type === "decrement") {
        const foundProduct = state.cartList.find(
          (item) => item.id === payload.id
        );

        updatedCartList =
          foundProduct.qty === 1
            ? state.cartList.filter((item) => item.id !== payload.id)
            : state.cartList.map((item) => {
                if (item.id === payload.id) {
                  return {
                    ...item,
                    qty: item.qty - 1,
                  };
                }
                return item;
              });
      }
      return {
        ...state,
        cartList: updatedCartList,
      };
    }
  }
};
