const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

//definiendo funcion para guardar la tarea por hacer en un JSON
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

//Definiendo funcion para leer el archivo data.json y retornarlo a listadoPorHacer
const cargarDB = () => {
    try {
        //Cargando el contenido data.json 
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

//definiendo las funciones que seran usadas en el app.js
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    //Insertando en el arreglo listadoPorHacer el objeto porHacer
    listadoPorHacer.push(porHacer);
    guardarDB();

    //retornando la tarea recien creada 
    return porHacer;
}

//Definiendo funcion para obtener listado desde data.json
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//Definiendo funcion para actualizar el status de una tarea 
const actualizar = (descripcion, completado = true) => {
    //cargando el contenido de la db en el arreglo listadoPorHacer
    cargarDB();

    //esta variable almacenara el indice de la descripcion q se esta buscando
    //Nota: esta funcion puede retornar -1, q significa q no encontro nada 
    let index = listadoPorHacer.findIndex(tarea => {
        //Retornar el indice de la tarea donde sus descripciones coincidan 
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        //Modificando la propiedad "completado" del listadoPorHacer seleccionado
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//Definiendo funcion para el borrado de una tarea
const borrar = (descripcion) => {
    //Cargando la base de datos 
    cargarDB();

    //Funcion que retorna un nuevo listado sin el elemento que coincida con la descripcion dada
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    //Si el nuevoListado tiene el mismo tamaño que el listado original "listadoPorHacer"
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

//Exportando la Funcion
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}