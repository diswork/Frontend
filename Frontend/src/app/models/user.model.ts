export class User {
    constructor(
        public _id: String,
        public nickName: String,
        public email: String,
        public password: String,
        public rol: String,
        public image: String,
        public telefono: String,
        public departamento: String,
        public institucion: String,
        public fechaNacimiento: Date,
        public ofertas: [],
        public cv: [],
        public empresas: [],
        public nivelAcademico: String,
        public categoria: String
    ) { }
}