export interface Usuario {
    uid: string | any; // atributos del tipo "any" reciben vacions o indefinidos
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    password: string;    
}
