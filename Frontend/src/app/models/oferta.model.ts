export class Oferta{
    constructor(
        public titulo: string,
        public descripcion: string,
        public categoria: string,
        public nivelAcademico: string,
        public tarjeta: string,
        public empresa: string,
        public curriculum: [],
        public imagen: string,
        public disponible: Boolean
    ){}
}