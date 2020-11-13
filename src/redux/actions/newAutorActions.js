import firebase from 'firebase';

export const AUTOR_SET_FIELD = 'AUTOR_SET_FIELD';
export const setAutorField = (field, value) => {
  return {
    type: AUTOR_SET_FIELD,
    field,
    value
  }
}

export const AUTOR_SET_ALL_FIELDS = 'AUTOR_SET_ALL_FIELDS';
export const setAutorAllFields = post => ({
  type: AUTOR_SET_ALL_FIELDS,
  post
});

export const AUTOR_RESET_FORM = 'AUTOR_RESET_FORM';
export const resetAutorForm = () => ({
  type: AUTOR_RESET_FORM
})

export const AUTOR_POST_SAVED_SUCCESS = 'AUTOR_POST_SAVED_SUCCESS';
export const postAutorSavedSuccess = () => {
  return {
    type: AUTOR_POST_SAVED_SUCCESS
  }
}

export const saveAutorPost = data => {
  const { currentUser } = firebase.auth();
  const postId = data.postId;

  delete data.postId;
  return async dispatch => {
    if (data.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts/${postId}/autor/${data.id}`)
        .set(data);

    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts/${postId}/autor`)
        .push(data);

    }

    dispatch(postAutorSavedSuccess());
  }
}





