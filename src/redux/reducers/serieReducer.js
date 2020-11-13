import { SET_POST } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_POST:
      return action.posts;
    default:
      return state;
  }
}