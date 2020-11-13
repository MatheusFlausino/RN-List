import { AUTOR_SET_FIELD, AUTOR_POST_SAVED_SUCCESS, AUTOR_SET_ALL_FIELDS, AUTOR_RESET_FORM} from '../actions';

const INITIAL_STATE = {
  id: null,
  nome: '',
  postId: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTOR_SET_FIELD:
      const clonedState = {...state};
      clonedState[action.field] = action.value;
      return clonedState;
    case AUTOR_POST_SAVED_SUCCESS:
      return INITIAL_STATE;
    case AUTOR_SET_ALL_FIELDS:
      return action.post;
    case AUTOR_RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}