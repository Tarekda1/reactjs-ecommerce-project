import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, { type, user }) => {
  switch (type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: user,
      };
    default:
      return state;
  }
};

export default userReducer;
