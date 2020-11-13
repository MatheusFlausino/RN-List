import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_POST = 'SET_POST';
const setPosts = posts => ({
  type: SET_POST,
  posts
})

export const watchDataPosts = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/posts`)
      .on('value', snapshot => {
        const posts = snapshot.val();
        const action = setPosts(posts);
        dispatch(action);
      })
  }
}

export const deleteDataPost = post => {
  
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Exclusão', 
        `Deseja excluir o post ${post.title}?`, 
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel'
        },{
          text: 'Sim',
          onPress: async () => {
            const { currentUser } = firebase.auth();

            try {
              await firebase
              .database()
                .ref(`/users/${currentUser.uid}/posts/${post.id}`)
                .remove();

              resolve(true);
            } catch(e) {
              reject(e);
            }

          }
        }
      ],
      { cancelable: false }
      )
    })
  }
}

export const deleteDataAutor = data => {
  
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Exclusão', 
        `Deseja excluir o autor ${data.nome}?`, 
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel'
        },{
          text: 'Sim',
          onPress: async () => {
            const { currentUser } = firebase.auth();

            try {
              await firebase
              .database()
                .ref(`/users/${currentUser.uid}/posts/${data.postId}/autor/${data.id}`)
                .remove();

              resolve(true);
            } catch(e) {
              reject(e);
            }

          }
        }
      ],
      { cancelable: false }
      )
    })
  }
}

export const deleteDataComment = data => {
  
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Exclusão', 
        `Deseja excluir o autor ${data.nome}?`, 
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel'
        },{
          text: 'Sim',
          onPress: async () => {
            const { currentUser } = firebase.auth();

            try {
              await firebase
              .database()
                .ref(`/users/${currentUser.uid}/posts/${data.postId}/comentario/${data.id}`)
                .remove();

              resolve(true);
            } catch(e) {
              reject(e);
            }

          }
        }
      ],
      { cancelable: false }
      )
    })
  }
}
