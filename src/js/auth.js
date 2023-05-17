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
  updateProfile
} from 'firebase/auth';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const headerSignButton = document.querySelector('call-to-registration-btn');
const modal = document.getElementById('modal-auth');
const close = document.getElementById('close');
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinContent = document.getElementById('signin-content');
const signupContent = document.getElementById('signup-content');
const signinButton = document.getElementById('signin-button');
const signupButton = document.getElementById('signup-button');
const userButton = document.getElementById('user-auth');
const logOutButton = document.getElementById('logaut-auth');

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      userButton.style.display = 'block';
      logOutButton.style.display = 'block';
      headerSignButton.style.display = 'none';
      userButton.textContent = user.displayName;
    } else {
      userButton.style.display = 'none';
      logOutButton.style.display = 'none';
      headerSignButton.style.display = 'block';
    }
  });
});
function checkAuthState() {
  const user = auth.currentUser;
  if (user) {
    userButton.style.display = 'block';
    logOutButton.style.display = 'block';
    headerSignButton.style.display = 'none';
    userButton.textContent = user.displayName;
  } else {
    userButton.style.display = 'none';
    logOutButton.style.display = 'none';
    headerSignButton.style.display = 'block';
  }
} 
function closeModal() {
  modal.style.display = 'none';
  signinContent.classList.remove('show');
  signinTab.classList.remove('is-active');
  signupTab.classList.add('is-active');
  checkAuthState();
};
function successfulLogin() {
   modal.style.display = 'none';
   userButton.style.display = 'block';
   userButton.textContent = user.displayName;
  logOutButton.style.display = 'block';
  checkAuthState();
};
function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signinButton.disabled = true;
  signinButton.textContent = 'Loading...';
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('Successful user login:', user);
      Notify.success('Successful login!');
      successfulLogin();
      checkAuthState();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('User not found', errorCode, errorMessage);
      Notify.failure('User not found');
    })
    .finally(() => {
      signinButton.disabled = false;
      signinButton.textContent = 'SIGN IN';
    });
}
function signUp() {
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
          Notify.failure('Email is already registered');
          signupButton.disabled = false;
          signupButton.textContent = 'Sign Up';
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
              const user = userCredential.user;
              console.log('Successful user registration:', user);
              Notify.success('Successful registration!');
              modal.style.display = 'none';

              return updateProfile(auth.currentUser, {
                displayName: name,
              });
            })
            .then(() => {
              console.log(
                'User profile updated:',
                auth.currentUser.displayName
              );
              checkAuthState();
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Error registering user:', errorCode, errorMessage);
              Notify.failure('Error registering user');
            })
            .finally(() => {
              signupButton.disabled = false;
              signupButton.textContent = 'Sign Up';
            });
        }
      })
      .catch(error => {
        console.error('Error checking email existence:', error);
        Notify.failure('Error checking email existence');
        signupButton.disabled = false;
        signupButton.textContent = 'Sign Up';
      });
  } else {
    console.log('Please fill in all fields.');
    Notify.failure('Please fill in all fields.');
    signupButton.disabled = false;
    signupButton.textContent = 'Sign Up';
  }
}
function logOut() {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
      Notify.success('Logged out successfully!');
    })
    .catch(error => {
      console.error('Error logging out:', error);
      Notify.failure('Error logging out');
    });

  checkAuthState();
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.style.display !== 'none') {
    closeModal();}
});
close.addEventListener('click', () => {
  closeModal();
  checkAuthState();
});
headerSignButton.addEventListener('click', () => {
  modal.style.display = 'block';
  signupContent.classList.add('show');
  signupTab.classList.add('is-active');
  headerSignButton.style.display = 'none';
});
logOutButton.addEventListener('click', () => {
  logOut();
});
signinTab.addEventListener('click', () => {
  signinContent.classList.add('show');
  signupContent.classList.remove('show');
  signupTab.classList.remove('is-active');
  signinTab.classList.add('is-active');
});
signupTab.addEventListener('click', () => {
  signinContent.classList.remove('show');
  signupContent.classList.add('show');
  signinTab.classList.remove('is-active');
  signupTab.classList.add('is-active');
});
signinButton.addEventListener('click', () => {
  signIn();
});
signupButton.addEventListener('click', () => {
  signUp();
});