export class User{
    constructor(
        public nickName: String,
        public email: String,
        public password: String,
        public rol: String,
        public image: String,
        public telefono: String,
        public ofertas: [],
        public empresas: []
    ){}
}