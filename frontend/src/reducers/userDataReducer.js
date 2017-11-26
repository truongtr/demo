import { GET_USE_DATA_SUCCESS, RESIZE_ITEM, MOVE_ITEM } from '../actions/types';

export default function (state = {
  items: {},
  groups: [],
}, action) {
  switch (action.type) {
    case GET_USE_DATA_SUCCESS:
      return { ...state, items: action.payload.items, groups: action.payload.groups };
    case RESIZE_ITEM:
    case MOVE_ITEM:
      return { ...state, items: { ...state.items, ...action.payload } };
    default:
      return state;
  }
}
