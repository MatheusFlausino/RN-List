import firebase from 'firebase';

export const COMMENT_SET_FIELD = 'COMMENT_SET_FIELD';
export const setCommentField = (field, value) => {
  return {
    type: COMMENT_SET_FIELD,
    field,
    value
  }
}

export const COMMENT_SET_ALL_FIELDS = 'COMMENT_SET_ALL_FIELDS';
export const setCommentAllFields = post => ({
  type: COMMENT_SET_ALL_FIELDS,
  post
});

export const COMMENT_RESET_FORM = 'COMMENT_RESET_FORM';
export const resetCommentForm = () => ({
  type: COMMENT_RESET_FORM
})

export const COMMENT_POST_SAVED_SUCCESS = 'COMMENT_POST_SAVED_SUCCESS';
export const postCommentSavedSuccess = () => {
  return {
    type: COMMENT_POST_SAVED_SUCCESS
  }
}

export const saveCommentPost = data => {
  const { currentUser } = firebase.auth();
  const postId = data.postId;

  delete data.postId;
  return async dispatch => {
    if (data.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts/${postId}/comentario/${data.id}`)
        .set(data);

    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts/${postId}/comentario`)
        .push(data);

    }

    dispatch(postCommentSavedSuccess());
  }
}





