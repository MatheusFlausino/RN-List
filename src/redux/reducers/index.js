import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newPostForm from './newPostForm';
import newCommentForm from './newCommentForm';
import newAutorForm from './newAutorForm';
import serieReducer from './serieReducer';

export default combineReducers({
  user: userReducer,
  postForm: newPostForm,
  listaPosts: serieReducer,
  commentForm: newCommentForm,
  autorForm: newAutorForm,
});