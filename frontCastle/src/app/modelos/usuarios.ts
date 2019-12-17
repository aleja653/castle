export class Usuario {

    constructor(
        public _id: String,
        public nombre: String,
        public edad: Number,
        public correo: String,
        public password: String,
        public imagen: String,
        public role: String,
        public plan: String,
        public metodoPago: String,
        public numtarjeta: String,
        public codigoVerificación: String,
        public fechaVenciTarjeta: String,
        public videoFavoritos: []
        ){}      
}