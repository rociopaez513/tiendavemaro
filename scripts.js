// ---------- 1. DATOS (array de objetos - Clase 9) ----------

const productos = [
  {
    id: 1,
    nombre: "Velas aromáticas",
    descripcion: "Vela de soja, aroma a lavanda. Duración aproximada: 40 horas.",
    precio: 5000
  },
  {
    id: 2,
    nombre: "Difusores",
    descripcion: "Difusor de varillas con esencia de sándalo, ideal para ambientes chicos.",
    precio: 6500
  },
  {
    id: 3,
    nombre: "Decoración",
    descripcion: "Portavelas de cerámica hechos a mano, en tonos neutros.",
    precio: 4000
  }
];


let carrito = [];

// ---------- 2. FUNCIONES (Clase 11) ----------


function crearTarjetaProducto({ id, nombre, precio }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = id; // guardamos el id del producto en el propio elemento

  const titulo = document.createElement("h3");
  titulo.classList.add("card__nombre");
  titulo.textContent = nombre;

  const precioTexto = document.createElement("p");
  precioTexto.classList.add("card__precio");
  precioTexto.textContent = `$${precio}`;

  const botones = document.createElement("div");
  botones.classList.add("card__botones");

  const botonDescripcion = document.createElement("button");
  botonDescripcion.classList.add("card__boton", "btn-descripcion");
  botonDescripcion.textContent = "Ver descripción";

  const botonCarrito = document.createElement("button");
  botonCarrito.classList.add("card__boton", "btn-carrito");
  botonCarrito.textContent = "Agregar al carrito";

  botones.appendChild(botonDescripcion);
  botones.appendChild(botonCarrito);

  card.appendChild(titulo);
  card.appendChild(precioTexto);
  card.appendChild(botones);

  return card;
}


function renderizarProductos(listaProductos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // limpiamos por si se vuelve a llamar

  listaProductos.forEach((producto) => {
    const tarjeta = crearTarjetaProducto(producto);
    contenedor.appendChild(tarjeta);
  });
}


function alternarDescripcion(card, idProducto) {
  const descripcionExistente = card.querySelector(".card__descripcion");

  if (descripcionExistente) {
    descripcionExistente.remove(); 
    return;
  }


  const producto = productos.find((p) => p.id === Number(idProducto));
  if (!producto) return;

  const descripcion = document.createElement("p");
  descripcion.classList.add("card__descripcion");
  descripcion.textContent = producto.descripcion;

  
  const botones = card.querySelector(".card__botones");
  card.insertBefore(descripcion, botones);
}


function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === Number(idProducto));
  if (!producto) return;

  carrito = [...carrito, producto];
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("carrito-contador");
  contador.textContent = carrito.length;
}

// ---------- 3. EVENTOS con DELEGACIÓN (Clase 12) ----------

function inicializarEventos() {
  const contenedor = document.getElementById("contenedor-productos");

  contenedor.addEventListener("click", function (event) {
    const card = event.target.closest(".card");
    if (!card) return; // el click no fue dentro de una tarjeta

    const idProducto = card.dataset.id;

    if (event.target.classList.contains("btn-descripcion")) {
      alternarDescripcion(card, idProducto);
    }

    if (event.target.classList.contains("btn-carrito")) {
      agregarAlCarrito(idProducto);
    }
  });
}

// ---------- 4. PUNTO DE ENTRADA ----------
// Esperamos a que el DOM esté listo antes de tocarlo.
document.addEventListener("DOMContentLoaded", function () {
  renderizarProductos(productos);
  inicializarEventos();
});


// Clase 13-15 mejoras
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function guardarCarrito(){localStorage.setItem("carrito",JSON.stringify(carrito));}
async function cargarProductos(){
 try{
   // Simulación usando datos locales
   return productos;
 }catch(e){
   console.error(e);
   alert("No se pudieron cargar los productos");
   return [];
 }
}
document.addEventListener("DOMContentLoaded", async ()=>{
 const datos=await cargarProductos();
 if(typeof mostrarProductos==="function"){mostrarProductos(datos);}
 guardarCarrito();
 const b=document.getElementById("buscador");
 if(b && typeof mostrarProductos==="function"){
  b.addEventListener("input",()=>{
    const f=productos.filter(p=>p.nombre.toLowerCase().includes(b.value.toLowerCase()));
    mostrarProductos(f);
  });
 }
});
