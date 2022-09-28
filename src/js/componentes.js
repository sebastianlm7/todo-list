
// Referencias en el HTML

import { Todo } from "../classes";

import { todoList } from "../index";

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo'); 
const btnBorrar     = document.querySelector('.clear-completed');  
const ulFiltros     = document.querySelector('.filters'); 
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    
    <li class=" ${ (todo.completado) ? 'completed' : '' }" data-id=" ${todo.id} ">
       <div class="view">
          <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}  >
          <label> ${todo.tarea} </label>
          <button class="destroy"></button>
       </div>
       <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append ( div.firstElementChild ); 

    return div.firstElementChild; 

    
}

// Eventos 

txtInput.addEventListener('keyup' , ( event ) => {  //esto me registra cada tecla que entro

    if (event.keyCode === 13 && txtInput.value.length > 0 ) {

        
        const nuevoTodo = new Todo( txtInput.value ); 
        todoList.nuevoTodo( nuevoTodo ); 

        crearTodoHtml (nuevoTodo ); //esto hace que cuando pongo nueva tarea se agregue a la lista
        txtInput.value = ''; //esto hace que el input se ponga en blanco desp de agregar una tarea

        
    };

});


divTodoList.addEventListener('click', ( event ) => { //evento de hacer click en el check, el texto o en la cruz

    
    const nombreElemento = event.target.localName; //referencia a que parte del div hice click (ccheck, texto, x)
    const todoElemento   = event.target.parentElement.parentElement; //referencia al elemento HTML (el elemento Li)
    const todoId         = todoElemento.getAttribute('data-id'); //esto selecciona el id de la tarea

    if ( nombreElemento.includes('input') ) { // pregunto si se hizo click en el check

        todoList.marcarCompletado( todoId ); // cambio de completado = false a true
        todoElemento.classList.toggle('completed') //esto quita o devuelve la clase completed

    } else if (nombreElemento.includes('button')) { //si esto sucede debo borrar la tarea (osea si presionan la x)

        todoList.eliminarTodo ( todoId ); // esto me lo elimina del array
        divTodoList.removeChild( todoElemento ); // esto me elimina todo el li (la tarea completa)

    }


})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados(); //esto me elimina los completados  los arreglos

    for ( let i = divTodoList.children.length-1; i>= 0 ; i-- ) { // el length menos 1 es para arrancar desde abajo, porque puede haber quilombo si borro elementos y cambien los indices

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) { //esto pregunta si el elemnto tiene la clase completed

            divTodoList.removeChild(elemento); // borro ese elemento si tiene completed

        } 

    }
    
    })


    ulFiltros.addEventListener('click', (event) => {
      
        const filtro = event.target.text ;

        if (!filtro) { return; } //si no hay ningun filtro no retorna nada

        anchorFiltros.forEach( elem => elem.classList.remove('selected') );
        event.target.classList.add('selected'); 



        for( const elemento of divTodoList.children ) { // recorro el div con las listas

            elemento.classList.remove('hidden') 
            const completado = elemento.classList.contains('completed'); //pregunto si tiene clase completed
            
            // aca hago un switch para ocultar o mostrar cada caso 
            switch ( filtro ) {

                case 'Pendientes':
                    if (completado) {
                        elemento.classList.add('hidden');
                    }
                break;

                case 'Completados':
                    if (!completado) {
                        elemento.classList.add('hidden');
                    }
                break;
            }
        
        }

    })

    
    

