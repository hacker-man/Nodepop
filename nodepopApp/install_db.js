"use strict";
//Base de datos
var conn = require('./lib/connectDB');
var mongoose = require('mongoose');
var hash = require('hash.js');
require('./models/anuncios');
require('./models/usuarios');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');
//Cargar libreria
var fs = require('fs');
/*Primero se eliminan los anuncios 
y usuarios de la base de datos*/
function eliminaUsuarios(cb) {
    Usuario.remove({}, function (err) {
        if (err)
            return cb(err);
        cb(null);
    });
}

function eliminaAnuncios(cb) {
    Anuncio.remove({}, function (err) {
        if (err)
            return cb(err);
        cb(null);
    });
}

/*Luego Cargamos Usuarios y datos a la la base de
datos de sus respectivos archivos json*/
function CargaDatos(modulo, callback) {
    //console.log("tipo:",typeof modulo,"contenido:",modulo);
    fs.readFile(modulo, {
        encoding: 'utf8'
    }, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        if (modulo == 'anuncios.json') {
            var datosDB = JSON.parse(data);
            var lenAnuncio = datosDB["anuncios"].length;
            var anuncios = datosDB["anuncios"];

            for (var i = 0; i < lenAnuncio; i++) {
                var anuncio = new Anuncio({
                    nombre: anuncios[i].nombre,
                    venta: anuncios[i].venta,
                    precio: anuncios[i].precio,
                    foto: anuncios[i].foto,
                    tags: anuncios[i].tags
                });
                // console.log(anuncio);
                anuncio.save(function (err, anuncioCreado) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    //console.log('Agente ' +anuncioCreado.name + ' creado');
                });
            }

            callback(null, "Anuncios Guardados correctamente");
        } else {
            var datosDB = JSON.parse(data);
            var lenUsuario = datosDB["usuarios"].length;
            var usuarios = datosDB["usuarios"];
            for (var i = 0; i < lenUsuario; i++) {
                var usuario = new Usuario({
                    nombre: usuarios[i].nombre,
                    email: usuarios[i].email,
                    clave: hash.sha256().update(usuarios[i].clave).digest('hex')
                });
                usuario.save(function (err, usuarioCreado) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    //console.log('Agente ' + usuarioCreado.name + ' creado');
                });
            }
            callback(null, "Usuarios Guardados correctamente");
        }

    });

};

/*Primero elimina los usuarios, luego los anuncios
y luego los carga nuevamente*/
eliminaUsuarios(function (err) {
    if (err) {
        console.error('Hubo un error: ', err);
        return;
    }
    console.log("usuarios eliminados con éxito");
    eliminaAnuncios(function (err) {
        if (err) {
            console.error('Hubo un error: ', err);
            return;
        }
        console.log("anuncios eliminados con éxito");
        //var terminado = [false,false];
        CargaDatos('anuncios.json', function (err, str) {
            if (err) {
                console.error('Hubo un error: ', err);
                return;
            }
            console.log(str);
        });
        CargaDatos('usuarios.json', function (err, str) {
            if (err) {
                console.error('Hubo un error: ', err);
                return;
            }
            console.log(str);
            
        });
    });

});