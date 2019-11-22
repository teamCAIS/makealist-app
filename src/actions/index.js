import {
  LOGIN,
  REGISTER,
  UPDATE_ADD_LIST_ORDERED,
  UPDATE_ADD_LIST_PRIVACY,
  UPDATE_PROFILE,
  UPDATE_TRENDING_ORDER_BY,
  UPDATE_ADD_LIST_SELECTED_CATEGORY,
} from '../constants/index';
import {login, register} from '../services/provider';
import AsyncStorage from '@react-native-community/async-storage';

export const updateUserInfo = async payload => {
  await AsyncStorage.setItem('user', JSON.stringify(payload));

  return {type: UPDATE_PROFILE, payload};
};

export const updateAddListOrdered = () => {
  return {type: UPDATE_ADD_LIST_ORDERED};
};

export const updateAddListPrivacy = () => {
  return {type: UPDATE_ADD_LIST_PRIVACY};
};

export const updateAddListSelectedCategory = payload => {
  return {type: UPDATE_ADD_LIST_SELECTED_CATEGORY, payload};
};

export const userLogin = payload => {
  return async dispatch => {
    const result = await login(payload);

    if (result.error) return result;

    dispatch(updateUserInfo(result));

    return true;
  };
};

export const userRegister = payload => {
  return async dispatch => {
    const result = await register(payload);

    if (result.error) return result;

    return true;
  };
};
