import './styles.css';

import { Todo, TodoList } from './classes'; //importo todas las clases listas
import { crearTodoHtml } from './js/componentes';




export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml ) ;  //con esto creo un HTML nuevamente para cada elemento que esta en el local storage



