import {IResCliente, Cliente} from '../interfaces/ICliente'
import {errorAxios, _http} from '../services/clienteService'

const registrar = async (nombres: any, cedula: any, correo: any, puntos: any) => {
    const data: Cliente | any = {
        nombres: nombres.value,
        cedula: cedula.value,
        correo: correo.value,
        puntos: puntos.value,
    }
    try {
        const respcliente: Cliente | any = await _http.post<Cliente>(
            `/registrar`,           
            data
        )
        const cliente = await respcliente.data

        console.log(`El cliente ${cliente.nombres} fue registrado con éxito`);
        

    } catch (error : Error | any) {
        errorAxios(error)    
    }
}

const editar = async (id:any, nombres: any, cedula: any, correo: any, puntos: any) => {
    const data: Cliente | any = {
        id: id.value,
        nombres: nombres.value,
        cedula: cedula.value,
        correo: correo.value,
        puntos: puntos.value,
    }
    try {
        const respcliente: Cliente | any = await _http.put<Cliente>(
            `/editar/${id.value}`,
            data
        )
        const {cliente} = await respcliente.data

        console.log(`El cliente ${cliente.nombres} fue actualizado con éxito`);
        

    } catch (error : Error | any) {
        errorAxios(error)    
    }

}

const consultar = async (id:any, nombres: any, cedula: any, correo: any, puntos:any, cuerpo:any) => {
    const rescliente : IResCliente = await (await _http.get<IResCliente>('/listar/')).data;

    const tabla = document.createElement("table")
    tabla.id = "tabla"
    tabla.border = "1"
    tabla.style.marginTop = '40px'
    tabla.style.marginLeft = '35%'

    const {clientes} = rescliente;

    for (const cliente of clientes)
    {
        const row = tabla.insertRow()
        const celda = row.insertCell()
        celda.innerHTML=`<button class="boton" value=${cliente._id}>${cliente.nombres}</button>`
        const celda2 = row.insertCell()
        celda2.innerHTML = `${cliente.cedula}`
        const celda3 = row.insertCell()
        celda3.innerHTML = `${cliente.correo}`
    }
    
    cuerpo.innerHTML=``
    cuerpo.appendChild(tabla)
    document.querySelectorAll('.boton').forEach((ele:Element) => {
        ele.addEventListener('click', async () => {
            const idx = (ele as HTMLButtonElement).value;
            console.log(idx);
            
            const {cliente} : Cliente | any = await (await _http.get<Cliente>(`/ver/${idx}`)).data;
            nombres.value = cliente.nombres;
            cedula.value = cliente.cedula;
            correo.value = cliente.correo;
            puntos.value = cliente.puntos;
            id.value = cliente._id!;
            console.log(cliente);
            
        })
    })

}

const eliminar = async (id:any) => {
    try {
        const respcliente: Cliente | any = await _http.delete<Cliente>(
            `/eliminar/${id.value}`
        )
        const {cliente} = await respcliente.data

        console.log(`El cliente ${cliente.nombres} fue eliminado con éxito`);
        

    } catch (error : Error | any) {
        errorAxios(error)    
    }
}

const limpiar = (id: any, nombres: any, cedula: any, correo: any, puntos: any) => {

    id.value=""
    nombres.value=""
    cedula.value=""
    correo.value=""
    puntos.value=""

}

export {
    registrar,
    consultar,
    editar,
    eliminar,
    limpiar,
}