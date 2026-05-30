import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "painel-igreja.firebaseapp.com",
  databaseURL: "https://painel-igreja-default-rtdb.firebaseio.com",
  projectId: "painel-igreja",
  storageBucket: "painel-igreja.firebasestorage.app",
  messagingSenderId: "363487795690",
  appId: "1:363487795690:web:d183059eaa7aae21c83a93"
};


// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// POSTS
const postsDiv = document.getElementById("posts");

onValue(ref(db, "posts"), (snapshot) => {

  postsDiv.innerHTML = "";

  snapshot.forEach((childSnapshot) => {

    const post = childSnapshot.val();

    postsDiv.innerHTML += `
      <div class="card-text-only">

        <div class="big-label">
          Aviso:
          <span>${post.titulo}</span>
        </div>

        <button
          class="btn-saiba"
          onclick="alert('${post.conteudo}')"
        >
          Saiba Mais
        </button>

      </div>
    `;

  });

});


// VERSÍCULO
const refTexto = document.getElementById("texto");

const refRef = document.getElementById("ref");


onValue(ref(db, "versiculo"), (snapshot) => {

  const dados = snapshot.val();

  if (dados) {

    refTexto.innerText = dados.texto;

    refRef.innerText = dados.referencia;

  }

});


// AGENDA
const agendaDiv = document.getElementById("agenda");


onValue(ref(db, "agenda"), (snapshot) => {

  agendaDiv.innerHTML = "";

  snapshot.forEach((childSnapshot) => {

    const item = childSnapshot.val();

    agendaDiv.innerHTML += `
      <div class="agenda-item">

        <div class="agenda-check"></div>

        <div class="agenda-info">

          <span class="agenda-name">
            ${item.nome}
          </span>

          <span class="agenda-time">
            ${item.horario}
          </span>

        </div>

      </div>
    `;

  });

});