import { actions } from "./actions";

export const initialState = {
  productList: [],
  cartList: [],
};

const {
  GET_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  // UPDATE_CART
} = actions;

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
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        cartList: filteredCart,
      };
    }
  }
};
