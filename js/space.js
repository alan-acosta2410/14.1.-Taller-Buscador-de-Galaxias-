// Esperar a que se cargue la página
document.addEventListener("DOMContentLoaded", function() {
  // Tomamos los elementos del HTML
  const boton = document.getElementById("btnBuscar");
  const input = document.getElementById("inputBuscar");
  const contenedor = document.getElementById("contenedor");

  // Cuando se hace clic en el botón
  boton.addEventListener("click", function() {
    const texto = input.value; // texto que escribió el usuario
    const url = "https://images-api.nasa.gov/search?q=" + texto;

    // Pedimos los datos a la API
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => {
        // limpiamos el contenedor antes de mostrar nuevos resultados
        contenedor.innerHTML = "";

        // los resultados están dentro de datos.collection.items
        const resultados = datos.collection.items;

        // recorremos los resultados y mostramos algunos datos
        resultados.forEach(item => {
          const info = item.data[0];
          const imagen = item.links ? item.links[0].href : "";
          const titulo = info.title;
          const descripcion = info.description;
          const fecha = info.date_created;

          // creamos una tarjeta simple
          const tarjeta = `
            <div class="card mb-3">
              <img src="${imagen}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="card-text"><small class="text-muted">${fecha}</small></p>
              </div>
            </div>
          `;

          contenedor.innerHTML += tarjeta; // agregamos al contenedor
        });
      })
      .catch(error => {
        console.log("Error:", error);
      });
  });
});
