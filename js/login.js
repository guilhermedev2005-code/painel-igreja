import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDbkGHKX2KE06CVFZ8NAb0lGM1n1evlITw",
  authDomain: "painel-igreja.firebaseapp.com",
  projectId: "painel-igreja",
  storageBucket: "painel-igreja.firebasestorage.app",
  messagingSenderId: "363487795690",
  appId: "1:363487795690:web:d183059eaa7aae21c83a93",
  measurementId: "G-3XHP44QF07"
};


// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// LOGIN
window.login = function(){

  const email = document.getElementById("email").value;

  const senha = document.getElementById("senha").value;


  signInWithEmailAndPassword(auth, email, senha)

    .then(() => {

      alert("Login feito com sucesso!");

      localStorage.setItem("adminLogado", "true");

      window.location.href = "admin.html";

    })

    .catch((error) => {

      alert("Erro: " + error.message);

    });

}