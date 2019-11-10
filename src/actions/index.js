import {
  LOGIN,
  REGISTER,
  UPDATE_ADD_LIST_ORDERED,
  UPDATE_ADD_LIST_PRIVACY,
  UPDATE_PROFILE,
  UPDATE_TRENDING_ORDER_BY,
  UPDATE_ADD_LIST_SELECTED_CATEGORY,
} from '../constants/index';

export const updateAddListOrdered = () => {
  return {type: UPDATE_ADD_LIST_ORDERED};
};

export const updateAddListPrivacy = () => {
  return {type: UPDATE_ADD_LIST_PRIVACY};
};

export const updateAddListSelectedCategory = payload => {
  return {type: UPDATE_ADD_LIST_SELECTED_CATEGORY, payload};
};
