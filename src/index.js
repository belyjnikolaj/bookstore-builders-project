import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import notiflix from 'notiflix';

const startButton = document.getElementById('start-button');
const modal = document.getElementById('modal-auth  ');
const close = document.getElementById('close');
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinContent = document.getElementById('signin-content');
const signupContent = document.getElementById('signup-content');
const backdropAuth = document.getElementById('backdropauth');

startButton.addEventListener('click', () => {
    modal.style.display = 'block';
    backdropAuth.style.display = 'block';
});

close.addEventListener('click', () => {
  backdropAuth.style.display = 'none';
  modal.style.display = 'none';
  startButton.innerText = `Start (${localStorage.getItem('email')})`;
});

signinTab.addEventListener('click', () => {
  signinContent.classList.add('show');
  signupContent.classList.remove('show');
});

signupTab.addEventListener('click', () => {
  signinContent.classList.remove('show');
  signupContent.classList.add('show');
});

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWbs0N9AYzirIviZZUsVMIJ2enE8aYPbw',
  authDomain: 'bookstorecommunity.firebaseapp.com',
  projectId: 'bookstorecommunity',
  storageBucket: 'bookstorecommunity.appspot.com',
  messagingSenderId: '67705966282',
  appId: '1:67705966282:web:466a7777f399c2354fae33',
  measurementId: 'G-X61KC3SJ2C',
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signinButton = document.getElementById('signin-button');
const signupButton = document.getElementById('signup-button');

signinButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Успішна авторизація
      const user = userCredential.user;
      console.log('Successful user login:', user);
      notiflix.Notify.Success('Successful login!');
      localStorage.setItem('email', email);
      modal.style.display = 'none';
      startButton.innerText = `Start (${email})`;
    })
    .catch(error => {
      // Помилка авторизації
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('User not found', errorCode, errorMessage);
      notiflix.Notify.Failure('User not found');
    });
});

signupButton.addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById(
    'signup-confirm-password'
  ).value;

  if (password !== confirmPassword) {
    console.error('Passwords do not match');
    notiflix.Notify.Failure('Passwords do not match');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Успішна реєстрація
      const user = userCredential.user;
      console.log('Successful user registration:', user);
      notiflix.Notify.Success(
        'Successful registration! Redirecting to another page...'
      );
      window.location.href = 'index.html';
    })
    .catch(error => {
      // Помилка реєстрації
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error registering user:', errorCode, errorMessage);
      notiflix.Notify.Failure('Error registering user');
    });
});
