export class User{
    constructor(
        public sub: String,
        public nickName: String,
        public email: String,
        public password: String,
        public rol: String,
        public image: String,
        public telefono: String,
        public ciudad: String,
        public colegio: String,
        public fechaNacimiento: String,
        public ofertas: [],
        public cv: [],
        public empresas: [],
        public nivelAcademico: String,        
        public categoria: String       
    ){}
}