// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargaEventListener();
function cargaEventListener() {
  //agrega un curso al presionar 'Agregar al Carrito'
  listaCursos.addEventListener('click', agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener('click',eliminarCurso);

  //vaciar el carrito 
  vaciarCarrito.addEventListener('click', eliminarCarrito);

}

//Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado= e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina curso
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    //elimina del arreglo por el data-id

    articulosCarrito = articulosCarrito.filter( curso=> curso.id !== cursoId);
    
    carritoHTML(); //iteramos sorbe el carrito y mostrar su html
  };
}

function eliminarCarrito(){
  articulosCarrito = [];
  limpiarHtml();
}

//Lee el contenido HMTL al que dimos click  y Extrae la informacion
function leerDatosCurso(curso) {
  

  //creamos un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1

  }

  //revisa si un elemento ya existe en el carrito 
  const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
  if(existe){
    //Actualizamos la cantidad
      const  cursos = articulosCarrito.map( curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            
            return curso;

          } else {

            return curso;
          }
        });

      articulosCarrito =[...cursos];
  } else {
    //agrega cursos al arreglo de carrito
    articulosCarrito =[...articulosCarrito,infoCurso];

  }


  carritoHTML()
 
}

function carritoHTML () {
  //limpia el html
  limpiarHtml();    

  //recorre el carrito y genera el html
  articulosCarrito.forEach( curso =>{
    const {imagen,titulo,precio,cantidad,id} = curso; //usamos distructuring para acceder a las propiedades, o sintaxys de punto: curso.imagen
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> <img src="${imagen}" width= 100>  </td> 
        <td>${titulo}</td> 
        <td> ${precio}</td> 
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a></td> 
        `;
        //agrega el hmtl del carrito en el tbody

        contenedorCarrito.appendChild(row);
    
  })
}

//elimina los curso del tbody 

function limpiarHtml () {
  //mejor perfomance
  //busca 1 elementos en el contenedor y lo remueve , se limpie el html
  while(contenedorCarrito.firstChild) {   
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }   

  // //forma  lenta
  // contenedorCarrito.innerHTML = "";
}