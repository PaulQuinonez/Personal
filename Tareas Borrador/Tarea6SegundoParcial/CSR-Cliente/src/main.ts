import './style.css'
import {registrar, editar, consultar, eliminar, limpiar} from './controllers/cliente'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1 style='text-transform: uppercase;'>Cliente</h1>
`

const etiqueta = document.createElement("label")
etiqueta.textContent="Identificador"
const input = document.createElement("input");
input.id="id"
input.style.marginLeft = '1%';
etiqueta.htmlFor="id"
app.appendChild(etiqueta);
app.appendChild(input);
app.innerHTML += `

<br><br><label for ="nombres">Nombres</label><input id="nombres" style='margin-left: 2.4%'/><br><br>
<label for ="cedula">Cedula</label><input id="cedula" style='margin-left: 3.4%'/><br><br>
<label for ="correo">Correo</label><input id="correo" style='margin-left: 3.4%'/><br><br>
<label for ="puntos">Puntos</label><input id="puntos" style='margin-left: 3%'/><br><br>

<button id="registrar" style='margin-left: auto'>Registrar Cliente</button>
<button id="editar" style='margin-left: 0.9%'>Editar Cliente</button>
<button id="consultar" style='margin-left: 0.9%'>Consultar Cliente</button>
<button id="eliminar" style='margin-left: 0.9%'>Eliminar Cliente</button>
<button id="limpiar" style='margin-left: 0.9%'>Limpiar Campos</button>
<div id="cuerpo"/>
`
// CONFIGURACION BOTONES
const grabar = document.querySelector<HTMLButtonElement>('#registrar')!
const edit = document.querySelector<HTMLButtonElement>('#editar')!
const consult = document.querySelector<HTMLButtonElement>('#consultar')!
const borrar = document.querySelector<HTMLButtonElement>('#eliminar')!
const clean = document.querySelector<HTMLButtonElement>('#limpiar')!

//CAMPOS
const id = document.querySelector<HTMLInputElement>('#id')!
const nombres = document.querySelector<HTMLInputElement>('#nombres')!
const cedula = document.querySelector<HTMLInputElement>('#cedula')!
const correo = document.querySelector<HTMLInputElement>('#correo')!
const puntos = document.querySelector<HTMLInputElement>('#puntos')!

const cuerpo = document.querySelector<HTMLDivElement>('#cuerpo')!

// ASIGNACION DE METODOS A LOS BOTONES

grabar.addEventListener('click', () =>{
  registrar(nombres, cedula, correo, puntos)
}
)
edit.addEventListener('click', () => {
  editar(id, nombres, cedula, correo, puntos);
})
consult.addEventListener('click', () => {
  consultar(id, nombres, cedula, correo, puntos, cuerpo);
})
borrar.addEventListener('click', () => {
  eliminar(id);
})
clean.addEventListener('click', () => {
  limpiar(id,nombres, cedula, correo, puntos);
})