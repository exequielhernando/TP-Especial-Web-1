
document.addEventListener("DOMContentLoaded",
  function(){
  "use strict";
  window.onload=cargarInicio();
  let inicio = document.querySelector("#inicio").addEventListener("click", cargarInicio);
  let shows = document.querySelector("#shows").addEventListener("click", cargarShows);
  let multimedia = document.querySelector("#multimedia").addEventListener("click", cargarMultimedia);
  let contacto = document.querySelector("#contacto").addEventListener("click", cargarContacto);
  let tabla = document.querySelector("#artistasRelacionados").addEventListener("click", cargarTablaArtistas);
  let contenedor = document.querySelector(".contenedorTabla");

const url = "https://web-unicen.herokuapp.com/api/groups/";
const groupID = "EHernando";
const collectionID = "artistasRelacionados"; 
function cargarPagina(url) {
    fetch(url).
    then(response =>{
      response.text().then(text=>{
        document.querySelector("#use-ajax").innerHTML = text;        
        if (url === "html/artistasRelacionados.html"){
          document.querySelector(".enviarDatos").addEventListener("click", sendData);
          document.querySelector(".enviarDatosx3").addEventListener("click", sendDatax3);
          document.querySelector(".editarArtista").addEventListener("click", editarArtista);
          document.querySelector(".buscarArtista").addEventListener("click", buscarArtista);
        }
      }
    )}
  )};
function cargarTablaArtistas(){
    cargarPagina("html/artistasRelacionados.html");
    getData();
  }
function cargarInicio(){
    cargarPagina("html/inicio.html");
  }
function cargarShows(){
    cargarPagina("html/shows.html");
  }
function cargarMultimedia(){
    cargarPagina("html/multimedia.html");
  }
function cargarContacto(){
    cargarPagina("html/contacto.html");
  }


function sendData(){
  let nombre = document.querySelector(".artista").value;
  let pagina = document.querySelector(".pagina").value;
  let contacto = document.querySelector(".contacto").value;

  let data = {
    "thing": {
      "nombre": nombre,
      "pagina": pagina,
      "contacto" : contacto,
    }
  };
  fetch(`${url}${groupID}/${collectionID}`,
   {
    "method": "POST",
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(response =>{
    if(!response.ok){
      console.log("error");
    }
    return response.json();
  })
  .then(json => {
    console.log(json);
    
    cargarTablaArtistas();
  })
  .catch(e =>{
    console.log(e);
  });
  }
function getData(){
    fetch(`${url}${groupID}/${collectionID}`,
     {
      method: "GET",
      mode: 'cors',
    }).then(response =>{
      if(!response.ok){
        console.log("error");
      }
      return response.json();
    })
    .then(json => {
      let pos = 1;
      contenedor = document.querySelector(".contenedorTabla");
      console.log(json);
      for (let data of json.artistasRelacionados) {
        contenedor.innerHTML +=    `<tr> 
                                      <td>${pos}</td>
                                      <td>${data.thing.nombre}</td>
                                      <td>${data.thing.pagina}</td>
                                      <td>${data.thing.contacto}</td>
                                      <td>${data._id}</td>
                                      <td><button type='button' name='${data._id}' class='eliminarArtista'>Eliminar</button></td>
                                    </tr>`;
        pos++;
        }
        let botonEliminar = document.querySelectorAll('.eliminarArtista');
          for (let i = 0; i < botonEliminar.length; i++) {
            botonEliminar[i].addEventListener("click", ()=>{ borrarArtista(botonEliminar[i].name)});  
          }
    })
    .catch(e =>{
      console.log(e);
    });
}
function borrarArtista(id) {
  console.log(id);
  fetch(`${url}${groupID}/${collectionID}/${id}`,
  {
    "method":"DELETE",
  }).then(response =>{
  if(!response.ok){
    console.log("Error")
  }
  return response.json()
  })
  .then(json => {
    console.log(json);
    cargarTablaArtistas();
  })
  .catch(e =>{
    console.log(e)
  })
}
function sendDatax3() {
  let nombre = document.querySelector(".artista").value;
  let pagina = document.querySelector(".pagina").value;
  let contacto = document.querySelector(".contacto").value;
  let contador = 0;
  let data = {
    "thing": {
      "nombre": nombre,
      "pagina": pagina,
      "contacto" : contacto,
    }
  };
  for (var i = 0; i < 3; i++) {
    fetch(`${url}${groupID}/${collectionID}`,
      {
      "method": "POST",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(data)
    }).then(response =>{
    if(!response.ok){
      console.log("error");
    }
    return response.json();
  })
  .then(json => {
    console.log(json);
    contador++;
    if (contador === 3) {
      cargarTablaArtistas();
    }
  })
  .catch(function(e){
    console.log(e);
  });
  }
}
function editarArtista(){
  let id = document.querySelector(".id").value;
  let nombre = document.querySelector(".editarNombreArtista").value;
  let pagina = document.querySelector(".editarPagina").value;
  let contacto = document.querySelector(".editarContacto").value;
  
  let data = {
    "thing": {
      "nombre": nombre,
      "pagina": pagina,
      "contacto" : contacto,
    }
  };
  fetch(`${url}${groupID}/${collectionID}/${id}`,{
    "method": "PUT",
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(response =>{
    if(!response.ok){
      console.log("Error");      
    }
    return response.json();
  })
  .then( json => {
    console.log(json);
    cargarTablaArtistas();
  })
  .catch(e =>{
    console.log(e);
  });
};

function buscarArtista(){
  fetch(`${url}${groupID}/${collectionID}`,
  {
    method: "GET",
    mode: "cors",
  }).then(response =>{
    if(!response.ok){
      console.log("error");
    }
    return response.json();
  })
  .then(json =>{
    let pos = 1;
    let artistaBuscado = document.querySelector(".nombreArtista").value;

    contenedor = document.querySelector(".contenedorTabla");
    contenedor.innerHTML = "";
    console.log(json);

    for (let data of json.artistasRelacionados) {
      let artista = data.thing.nombre;
      if ( artista === artistaBuscado) {
        contenedor.innerHTML += `<tr>
                                   <td>${pos}</td>
                                   <td>${data.thing.nombre}</td>
                                   <td>${data.thing.pagina}</td>
                                   <td>${data.thing.contacto}</td>
                                   <td>${data._id}</td>
                                   <td><button type='button' name='${data._id}' class='eliminarArtista'>Eliminar</button></td>
                                  </tr>`;
        pos++;
      }
    }
    let botonEliminar = document.querySelectorAll('.eliminarArtista');
    for (let i = 0; i < botonEliminar.length; i++) {
      botonEliminar[i].addEventListener("click", ()=>{ borrarArtista(botonEliminar[i].name)});
    }
  })
  .catch(e =>{
    console.log(e);
  });
}
});
