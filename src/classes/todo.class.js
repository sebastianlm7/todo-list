
export class Todo {  //creo una clase donde voy a recibir la tarea que ingreso y le asigna propiedades

    // esto hace que yo vuelva a obtener las propiades del json para luego aplicar los metodos 

    static fromJson ( { id, tarea, completado, creado}) { // desestructuro el objeto para obtener cada propiedad

        const tempTodo = new Todo ( tarea );
        
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo // regreso la instancia del Todo
    }

    constructor( tarea ) {

        this.tarea      = tarea;

        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();

    }

    imprimirClase() {
        console.log( `${ this.tarea } - ${this.id} `); 
    }
}