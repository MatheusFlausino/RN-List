import { COMMENT_SET_FIELD, COMMENT_POST_SAVED_SUCCESS, COMMENT_SET_ALL_FIELDS, COMMENT_RESET_FORM} from '../actions';

const INITIAL_STATE = {
  id: null,
  comentario: '',
  postid: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case COMMENT_SET_FIELD:
      const clonedState = {...state};
      clonedState[action.field] = action.value;
      return clonedState;
    case COMMENT_POST_SAVED_SUCCESS:
      return INITIAL_STATE;
    case COMMENT_SET_ALL_FIELDS:
      return action.post;
    case COMMENT_RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}