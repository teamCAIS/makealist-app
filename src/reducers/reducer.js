import {
  UPDATE_ADD_LIST_ORDERED,
  UPDATE_ADD_LIST_PRIVACY,
  UPDATE_ADD_LIST_SELECTED_CATEGORY,
  UPDATE_TRENDING_ORDER_BY,
  UPDATE_PROFILE,
} from '../constants/index';

const initialState = {
  id: null,
  name: '',
  email: '',
  avatar_url: null,
  bio: null,
  birthday: '1990/01/01',
  addListConfiguration: {
    ordered: true,
    privacy: false,
    selectedCategory: 0,
  },
  trendingFilter: {
    orderBy: 0,
  },
};

const userReducer = (state = initialState, action) => {
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

    case UPDATE_PROFILE:
      return Object.assign({}, state, {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        avatar_url: action.payload.photo,
        birthday: action.payload.birth_day,
        bio: action.payload.bio,
      });
  }

  return state;
};

export default userReducer;
