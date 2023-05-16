const firebaseConfig = {
  apiKey: 'AIzaSyCWbs0N9AYzirIviZZUsVMIJ2enE8aYPbw',
  authDomain: 'bookstorecommunity.firebaseapp.com',
  projectId: 'bookstorecommunity',
  storageBucket: 'bookstorecommunity.appspot.com',
  messagingSenderId: '67705966282',
  appId: '1:67705966282:web:466a7777f399c2354fae33',
  measurementId: 'G-X61KC3SJ2C',
};

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import notiflix from 'notiflix';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const startButton = document.getElementById('start-button');
const modal = document.getElementById('modal-auth');
const close = document.getElementById('close');
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinContent = document.getElementById('signin-content');
const signupContent = document.getElementById('signup-content');
const signinButton = document.getElementById('signin-button');
const signupButton = document.getElementById('signup-button');
const userButton = document.getElementById('user-auth');
const logAutButton = document.getElementById('logaut-auth');

startButton.addEventListener('click', () => {
  modal.style.display = 'block';
  signinContent.classList.add('show');
  startButton.style.display = 'none';
});

// Function to check the user's authentication state
function checkAuthState() {
  const user = auth.currentUser;
  if (user) {
    userButton.style.display = 'block';
    logAutButton.style.display = 'block';
    startButton.style.display = 'none';
    userButton.textContent = user.displayName;
  } else {
    userButton.style.display = 'none';
    logAutButton.style.display = 'none';
    startButton.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      userButton.style.display = 'block';
      logAutButton.style.display = 'block';
      startButton.style.display = 'none';
      userButton.textContent = user.displayName;
    } else {
      userButton.style.display = 'none';
      logAutButton.style.display = 'none';
      startButton.style.display = 'block';
    }
  });

  checkAuthState();
});

close.addEventListener('click', () => {
  modal.style.display = 'none';
  checkAuthState();
});

logAutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
      notiflix.Notify.Success('Logged out successfully!');
    })
    .catch(error => {
      console.error('Error logging out:', error);
      notiflix.Notify.Failure('Error logging out');
    });
  checkAuthState();
});

signinTab.addEventListener('click', () => {
  signinContent.classList.add('show');
  signupContent.classList.remove('show');
});

signupTab.addEventListener('click', () => {
  signinContent.classList.remove('show');
  signupContent.classList.add('show');
});

signinButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('Successful user login:', user);
      notiflix.Notify.Success('Successful login!');
      modal.style.display = 'none';
      userButton.style.display = 'block';
      userButton.textContent = user.displayName;
      logAutButton.style.display = 'block';
      checkAuthState();})
.catch(error => {
const errorCode = error.code;
const errorMessage = error.message;
console.error('User not found', errorCode, errorMessage);
notiflix.Notify.Failure('User not found');
});
});

signupButton.addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('name').value;

  signupButton.disabled = true;
  signupButton.textContent = 'Loading...';

  if (email && password && name) {
    fetchSignInMethodsForEmail(auth, email)
      .then(signInMethods => {
        if (signInMethods.length > 0) {
          console.log('Email is already registered:', email);
          notiflix.Notify.Failure('Email is already registered');
          signupButton.disabled = false;
          signupButton.textContent = 'Sign Up';
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
              const user = userCredential.user;
              console.log('Successful user registration:', user);
              notiflix.Notify.Success(
                'Successful registration! Redirecting to another page...'
              );
              if (user.updateProfile) {
                return user.updateProfile({
                  displayName: name,
                });
              } else {
                throw new Error('User profile update method not found');
              }
            })
            .then(() => {
              console.log(
                'User profile updated:',
                auth.currentUser.displayName
              );
              modal.style.display = 'none';
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Error registering user:', errorCode, errorMessage);
              notiflix.Notify.Failure('Error registering user');
            })
            .finally(() => {
              signupButton.disabled = false;
              signupButton.textContent = 'Sign Up';
              checkAuthState();
            });
        }
      })
      .catch(error => {
        console.error('Error checking email existence:', error);
        notiflix.Notify.Failure('Error checking email existence');
        signupButton.disabled = false;
        signupButton.textContent = 'Sign Up';
      });
  } else {
    console.log('Please fill in all fields.');
    notiflix.Notify.Failure('Please fill in all fields.');
    signupButton.disabled = false;
    signupButton.textContent = 'Sign Up';
  }
});