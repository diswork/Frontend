export class Oferta {
    constructor(
        public _id: String,
        public titulo: String,
        public descripcion: String,
        public fechaPublicacion: Date,
        public categoria: String,
        public nivelAcademico: String,
        public tarjeta: String,
        public empresa: String,
        public curriculum: [],
        public imagen: String,
        public disponible: Boolean
    ) {}
}