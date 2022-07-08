import axios from "axios";
import { IResCliente } from "../interfaces/ICliente";

export const _http = axios.create({
    baseURL: 'http://localhost:3100/TecnoService/api/clientes'
})

export const postCliente = async (url: string, data: IResCliente[]) => {
    return await _http.post(url, data)
}

export const getCliente = async (url: string) => {
    return await _http.get(url)
}

export const putCliente = async (url: string, data: IResCliente[]) => {
    return await _http.put(url, data)
}

export const deleteCliente = async (url: string) => {
    return await _http.delete(url)
}

export const errorAxios = (error: Error) => {
    if (axios.isAxiosError(error)) {
        console.log('Error en el servidor')
    }
}

