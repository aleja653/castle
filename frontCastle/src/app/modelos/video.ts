export class Video {

    constructor(
        public _id: String, //public--> modificadores de acceso al atributo y lo dejamos público para que todos los métodos tengan acceso
        public titulo: String,
        public tipo: String,
        public genero: String,
        public sinopsis: String,
        public clasificación: String,
        public temporada: {},
        public imagen: String,  
        public archivo: String //cuidado porque en usuario este se llama archivo y a veces lo llamamos mal
    ) {}
 
}