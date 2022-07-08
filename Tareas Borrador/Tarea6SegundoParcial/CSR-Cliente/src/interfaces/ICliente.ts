export interface IResCliente {
    total: number;
    clientes: Cliente[];
}

export interface Cliente{

    _id?: string,
    nombres: string,
    cedula: string,
    correo: string,
    puntos: number

}