import {DONE_TASK_LIST, TASK_LIST} from '../type/index';
const initialState = {
  input: '',
};
const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LIST:
      return {
        ...state,
        add: action.payload,
      };
    case DONE_TASK_LIST:
      return {
        ...state,
        complete: action.payload,
      };
    default:
      return state;
  }
};
export default inputReducer;
