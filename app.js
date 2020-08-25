//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const colors = require('colors');

//Importando la funcion de crear
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

//obtener el comando que se esta ingresando por consola 
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('==========Por Hacer========'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==========================='.green);
        }

        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

        //Si ningun comando coincide
    default:
        console.log('Comando no reconocido');
}