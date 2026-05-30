if(localStorage.getItem("adminLogado") !== "true"){

  window.location.href = "login.html";

}
   import { getAuth }
from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

    // CONFIG FIREBASE
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbkGHKX2KE06CVFZ8NAb0lGM1n1evlITw",
  authDomain: "painel-igreja.firebaseapp.com",
  databaseURL: "https://painel-igreja-default-rtdb.firebaseio.com",
  projectId: "painel-igreja",
  storageBucket: "painel-igreja.firebasestorage.app",
  messagingSenderId: "363487795690",
  appId: "1:363487795690:web:d183059eaa7aae21c83a93",
  measurementId: "G-3XHP44QF07"
};

    // INICIALIZAÇÃO
    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);

    

    // POSTS
    window.postar = function(){

      const titulo = document.getElementById("titulo").value;

      const conteudo = document.getElementById("conteudo").value;

      if(!titulo || !conteudo){
        alert("Preencha todos os campos!");
        return;
      }

      push(ref(db, "posts"), {
        titulo: titulo,
        conteudo: conteudo
      });

      alert("Post publicado!");

      document.getElementById("titulo").value = "";
      document.getElementById("conteudo").value = "";

    }

    // VERSÍCULO
    window.salvarVersiculo = function(){

      const referencia = document.getElementById("referencia").value;

      const texto = document.getElementById("textoVersiculo").value;

      if(!referencia || !texto){
        alert("Preencha todos os campos!");
        return;
      }

      set(ref(db, "versiculo"), {
        referencia: referencia,
        texto: texto
      });

      alert("Versículo salvo!");

      document.getElementById("referencia").value = "";
      document.getElementById("textoVersiculo").value = "";

    }

    // AGENDA
    window.salvarAgenda = function(){

      const nome = document.getElementById("nomeAgenda").value;

      const horario = document.getElementById("horarioAgenda").value;

      if(!nome || !horario){
        alert("Preencha todos os campos!");
        return;
      }

      push(ref(db, "agenda"), {
        nome: nome,
        horario: horario
      });

      alert("Evento salvo!");

      document.getElementById("nomeAgenda").value = "";
      document.getElementById("horarioAgenda").value = "";

    }

    // LISTAR EVENTOS
const listaAgenda = document.getElementById("listaAgenda");

onValue(ref(db, "agenda"), (snapshot) => {

  listaAgenda.innerHTML = "";

  snapshot.forEach((childSnapshot) => {

    const item = childSnapshot.val();

    const id = childSnapshot.key;

    listaAgenda.innerHTML += `
    
      <div style="
        background:#1f1f1f;
        padding:15px;
        border-radius:10px;
        margin-top:10px;
      ">

        <h3>${item.nome}</h3>

        <p style="margin:10px 0;">
          ${item.horario}
        </p>

        <button onclick="deletarAgenda('${id}')">
          Remover
        </button>

      </div>

    `;
  });

});

// LISTAR POSTS
const listaPosts = document.getElementById("listaPosts");

onValue(ref(db, "posts"), (snapshot) => {

  listaPosts.innerHTML = "";

  snapshot.forEach((childSnapshot) => {

    const post = childSnapshot.val();

    const id = childSnapshot.key;

    listaPosts.innerHTML += `
      <div style="
        background:#1f1f1f;
        padding:12px;
        border-radius:8px;
        margin-bottom:10px;
      ">

        <p style="margin-bottom:10px;">
          ${post.titulo}
        </p>

        <button onclick="removerPost('${id}')">
          Remover
        </button>

      </div>
    `;

  });

});

// REMOVER POST
window.removerPost = function(id){

  remove(ref(db, "posts/" + id));

  alert("Post removido!");

}

// REMOVER EVENTO
window.deletarAgenda = function(id){

  remove(ref(db, "agenda/" + id));

  alert("Evento removido!");

}
