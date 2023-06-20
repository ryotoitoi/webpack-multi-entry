// import librabries
import { initializeApp } from "firebase/app"
import {
  getAuth,
  getIdToken,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult
} from "firebase/auth"
import firebaseConfig from '../firebase-config.json';

main()

async function main() {
  try {
    const el = {
      sectionSignin: document.querySelector('#sectionSignin'),
      sectionUser: document.querySelector('#sectionUser'),
      sectionSignout: document.querySelector('#sectionSignout'),

      buttonSignin: document.querySelector('#buttonSignin'),
      buttonSignout: document.querySelector('#buttonSignout'),

      uid: document.querySelector('#uid'),
      errorMessage: document.querySelector('#errorMessage'), // Add this line
    }

    // read json file and initialize firebase app and auth
    // const response = await fetch(firebaseConfigJson) // <1>
    // const firebaseConfig = await response.json()
    const app = initializeApp(firebaseConfig) // <2>
    const auth = getAuth(app) // <3>

    // check user state and display UI  accordingly
    onAuthStateChanged(auth, async (user) => { // <4>
      if (user) {
        el.sectionSignin.style.display = 'none'
        el.sectionUser.style.display = 'block'
        el.sectionSignout.style.display = 'block'
        el.uid.innerHTML = user.uid
        const token = await getIdToken(user)
        console.log('----token----')
        console.log(token.toString())
        console.log('----token----')
        getRedirectResult(auth)
        .then((result) => {
          // Signed in. Now redirect to the desired page.
          window.location.href = "another.html";
        })
        .catch((error) => {
          // Handle Errors here.
          console.error(error);
        })
      } else {
        el.sectionSignin.style.display = 'block'
        el.sectionUser.style.display = 'none'
        el.sectionSignout.style.display = 'none'
      }
    })

    // add event listeners  to buttons  to sign in and sign out users
    el.buttonSignin.addEventListener('click', async (event) => { // <5>
      try {
        event.preventDefault()

        const provider = new GoogleAuthProvider()
        await signInWithRedirect(auth, provider)
      } catch (err) {
        el.errorMessage.innerHTML = err.message
        console.error(err)
      }
    })

    el.buttonSignout.addEventListener('click', async (event) => { // <6>
      try {
        event.preventDefault()
        await signOut(auth)
      } catch (err) {
        console.error(err)
      }
    })
  } catch (err) {
    console.error(err)
  }
}
