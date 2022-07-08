const {program} = require('commander'); //Permite procesar lo que escribamos en consola
const {prompt} = require('inquirer'); //Permite poder mostrar mejores inputs y procesar datos de una mejor manera
const {addMeeting, listMeetings, deleteMeeting, updateMeeting, findMeeting} = require ('./controllers/meeting.controllers')


program.version('0.0.1').description("Es un programa para administrar reuniones.");
program.parse(process.argv); //Procesa los espacios de un arreglo

const MeetingQ = 
[
    {

        type: 'input',
        message: 'Meeting title',
        name: 'title'

    },

    {

        type: 'input',
        message: 'Meeting description',
        name: 'description'

    }, 
]

//Creamos nuestros propios comandos con command

//GUARDAR
program.command('save').alias('s').action(async () => {

    console.clear();
    const answers = await prompt(MeetingQ) //Con esto detallamos que es lo que quiero mostrar al usuario

        addMeeting(answers);

}) 

//LISTAR
program.command('list').alias('l').action((text) => {
    console.clear();
    listMeetings(text);
})

//ELIMINAR
program.command('delete <id>').alias('d').action((_id) => {
    console.clear();
    deleteMeeting(_id);
})

//ACTUALIZAR
program.command('update <id>').alias('u').action(async (_id) => {
    console.clear();
    const answers = await prompt(MeetingQ)
    await updateMeeting(_id, answers) //Recibe el _id y los nuevos campos 
})

//BUSCAR
program.command('find <word>').alias('f').action((text) => {
    console.clear();
    findMeeting(text)
})

//Comando para guardar con los parametos que utilizamos, con action establecemos la lógica cuando este comando sea llamado
program.parse(program.argv);


