// Variables

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminaCurso)
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];

    limpiarCarrito()
  })
}


//Funciones

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado)
  }
}

//Elimina Curso
function eliminaCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id')

    //Eliminar curso
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
    carritoHTML()
  }
}


//Lee el contenido del curso

function leerDatosCurso(curso) {

  //Crea un objeto con la info del curso seleccionado
  console.log(curso);


  const infoCurso = {

    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  //Revisa si el articulo existe
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

  if(existe){

    const cursos = articulosCarrito.map( curso => {

      if (curso.id === infoCurso.id){
        curso.cantidad++;
        return curso;
      }else{
        return curso;
      }
    })
  }else{
    articulosCarrito = [...articulosCarrito, infoCurso]
  }

  //Agraga elementos al carrito


  console.log(articulosCarrito);

  carritoHTML()
}

//Muestra el carrito en el HTML
function carritoHTML() {

  //limpiar HTML
  limpiarCarrito()

  //Recore el carrito y genera HTML
  articulosCarrito.forEach(curso => {
    const {imagen, titulo, precio, cantidad, id} = curso
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" height="50" width="100"/></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td> <a href="#" class="borrar-curso" data-id=${id}> x </a></td>

    `

    contenedorCarrito.appendChild(row)
  })
}

//Elimina los cursos del tbody

function limpiarCarrito() {
  //contenedorCarrito.innerHTML = '';

  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
