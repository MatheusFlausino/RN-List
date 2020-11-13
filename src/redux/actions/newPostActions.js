import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  }
}

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = post => ({
  type: SET_ALL_FIELDS,
  post
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

export const POST_SAVED_SUCCESS = 'POST_SAVED_SUCCESS';
export const serieSavedSuccess = () => {
  return {
    type: POST_SAVED_SUCCESS
  }
}

export const savePost = data => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (data.id) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts/${data.id}`)
        .set(data);

    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/posts`)
        .push(data);

    }

    dispatch(serieSavedSuccess());
  }
}





