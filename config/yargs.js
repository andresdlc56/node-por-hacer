//la siguiente opciones almacenan los parametros de los comandos listar y crear
const opts1 = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    }
}

const opts2 = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    },
    completado: {
        demand: true,
        alias: 'c',
        default: true,
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opts1)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opts2)
    .command('borrar', 'Borar un tarea por hacer de la lista', opts1)
    .help()
    .argv;

module.exports = {
    argv
}