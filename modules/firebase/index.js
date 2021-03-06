import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { config, FACEBOOK_APPID, GOOGLE_CLIENTID } from './config'
import * as Expo from 'expo'

firebase.initializeApp(config)

// auth

export const auth = firebase.auth()

export const getToken = async () => {
  const user = firebase.auth().currentUser

  if(user) {
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      const token = idToken
      console.log('hello')
      return { token }
    })
    .catch(err => {
      const error = err
      console.log(err)
      return { error }
    })
  }
  else {
    return { token: null }
  }
}

export const getUid = () => {
  const user = firebase.auth().currentUser

  if (user) {
    return { uid: user.uid }
  }
  else {
    return { uid: null }
  }
}

export const authGoogle = async () => {
  try {
    const { type, idToken, accessToken } = await Expo.Google.logInAsync({
      behavior: 'web',
      iosClientId: GOOGLE_CLIENTID,
      scopes: ['profile', 'email'],
    })

    if (type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => console.log(error))
    }
    else {
      return { cancelled: true　}
    }
  }
  catch (e) {
    return { error: true }
  }
}

export const authFacebook = async () => {
  try {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_APPID,
      { permissions: ['public_profile'] }
    )

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => console.log(error))
    }
    else {
      return { cancelled: true　}
    }
  }
  catch (e) {
    return { error: true }
  }
}

export const logout = () => {
  return firebase.auth().signOut()
}

// firestore

export const db = firebase.firestore()
export const userCollection = db.collection('user')
export const novelCollection = db.collection('novel')

export const getNowDate = () => {
  return firebase.firestore.FieldValue.serverTimestamp()
}

export const getNewNovelDoc = () => {
  return novelCollection.doc()
} 

// storage

const storageRef = firebase.storage().ref()
export const userRef = storageRef.child('user')
export const novelRef = storageRef.child('novel')

export const uploadAvatar = async(uri) => {
  const { uid } = getUid()
  const avatarRef = userRef.child(`${uid}/avatar/avatar1.png`)

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }

    xhr.onerror = e => {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }

    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  const snapshot = await avatarRef.put(blob)
  blob.close()
  return await snapshot.ref.getDownloadURL()
}

export const uploadNovelImage = async(uri, uuid) => {
  const { uid } = getUid()
  const novelImageRef = userRef.child(`${uid}/novel/${uuid}/main.png`)

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }

    xhr.onerror = e => {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }

    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  const snapshot = await novelImageRef.put(blob)
  blob.close()
  return await snapshot.ref.getDownloadURL()
}
