import {
  UPDATE_ADD_LIST_ORDERED,
  UPDATE_ADD_LIST_PRIVACY,
  UPDATE_ADD_LIST_SELECTED_CATEGORY,
  UPDATE_TRENDING_ORDER_BY,
} from '../constants/index';
import {createStore} from 'redux';

const initialState = {
  name: 'Caio Nunes',
  email: 'caionunes3000@gmail.com',
  avatar_url: null,
  birthday: '1997/08/27',
  addListConfiguration: {
    ordered: true,
    privacy: false,
    selectedCategory: 0,
  },
  trendingFilter: {
    orderBy: 0,
  },
};

const reducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    default:
      return initialState;

    case UPDATE_ADD_LIST_ORDERED:
      return Object.assign({}, state, {
        addListConfiguration: {
          ...state.addListConfiguration,
          ordered: !state.addListConfiguration.ordered,
        },
      });

    case UPDATE_ADD_LIST_PRIVACY:
      return Object.assign({}, state, {
        addListConfiguration: {
          ...state.addListConfiguration,
          privacy: !state.addListConfiguration.privacy,
        },
      });

    case UPDATE_ADD_LIST_SELECTED_CATEGORY:
      return Object.assign({}, state, {
        addListConfiguration: {
          ...state.addListConfiguration,
          selectedCategory: action.payload,
        },
      });
  }

  return state;
};

const userReducer = createStore(reducer);

export default userReducer;
