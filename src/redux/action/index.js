import {DONE_TASK_LIST, TASK_LIST} from '../type/index';

export function addTask(input) {
  return {
    type: TASK_LIST,
    payload: input,
  };
}
export function completeTask(input) {
  return {
    type: DONE_TASK_LIST,
    payload: input,
  };
}
