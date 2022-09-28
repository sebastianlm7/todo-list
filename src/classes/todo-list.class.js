import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        
        this.cargarLocalStorage();
    }

    nuevoTodo (todo) {
        this.todos.push ( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) { 

        this.todos = this.todos.filter( todo => todo.id != id ) //esto regresa un nuevo array sin la tarea que coincida con el id

        this.guardarLocalStorage();

    }

    marcarCompletado( id ) { //este es el metodo que transforma el false en true cuando chequeo

        for ( const todo of this.todos) {

            if (todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;

            }
        }
    
    }

    eliminarCompletados ( ) {

        this.todos = this.todos.filter( todo => !todo.completado ) //esto me filtra y me quedo con los NO completados
        this.guardarLocalStorage();

        
    }


    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) ); //el JSON.stringify me trnasfomra el objeto en un tipo json 

    }

    cargarLocalStorage() {
         // esto pregunta si hay todos en el local storage y en base a eso retorna un array con esas todos o uno vacio
        
         this.todos = ( localStorage.getItem('todo')  
                                        ? JSON.parse( localStorage.getItem('todo')) 
                                        : [])
        
        
        
        // this.todos = this.todos.map( obj => Todo.fromJson( obj )) // el map barre cada elemento del array y retorna un nuevo arreglo con cada uno de los arreglos pasado por la funcion
        this.todos = this.todos.map( Todo.fromJson )
    }

}