"use strict";
//Base de datos
require('./models/anuncios');
require('./models/usuarios');
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');
var conn = require('./lib/connectDB');
var hash = require('hash.js');
var async = require('async');


//Cargar libreria
var fs = require('fs');
/*Primero se eliminan los anuncios 
y usuarios de la base de datos*/
function eliminaUsuarios() {
    return new Promise(function (resolve, reject) {
        Usuario.remove({}, function (err) {
            if (err)
                reject(console.log('Error al eliminar usuario', err));

        });
        resolve(console.log('Usuarios eliminados'));
    });

}

function eliminaAnuncios() {
    return new Promise(function (resolve, reject) {
        Anuncio.remove({}, function (err) {
            if (err)
                reject(console.log('Error al eliminar anuncio', err));

        });
        resolve(console.log('Anuncios elimnados'));
    });

}

function CargaAnuncios() {
    return new Promise(function (resolve, reject) {
        fs.readFile('anuncios.json', {
            encoding: 'utf8'
        }, function (err, data) {
            if (err) {
                reject(err);
            }

            var datosDB = JSON.parse(data);
            var lenAnuncio = datosDB["anuncios"].length;
            var anuncios = datosDB["anuncios"];

            async.each(anuncios, function cada(item, siguiente) {
                var anuncio = new Anuncio({
                    nombre: item.nombre,
                    venta: item.venta,
                    precio: item.precio,
                    foto: item.foto,
                    tags: item.tags
                });
                anuncio.save(function (err, anuncioCreado) {
                    if (err) {
                        siguiente(err);
                        return;
                    }
                    siguiente();
                });

            }, function (err) {
                if (err) {
                    reject("Se ha producido un error al cargar anuncios", err);
                } else {

                    resolve(console.log('Anuncios cargados'));
                }
            });


        });
    });
}

function CargaUsuarios() {
    return new Promise(function (resolve, reject) {
        fs.readFile('usuarios.json', {
            encoding: 'utf8'
        }, function (err, data) {
            if (err) {
                reject(err);
            }

            var datosDB = JSON.parse(data);
            var lenUsuario = datosDB["usuarios"].length;
            var usuarios = datosDB["usuarios"];

            async.each(usuarios, function cada(item, siguiente) {
                var usuario = new Usuario({
                    nombre: item.nombre,
                    email: item.email,
                    clave: hash.sha256().update(item.clave).digest('hex')
                });
                usuario.save(function (err, usuarioCreado) {
                    if (err) {
                        siguiente(err);
                        return;
                    }
                    siguiente();
                });
            }, function (err) {
                if (err) {
                    reject("Se ha producido un error al cargar usuarios", err);
                } else {
                    resolve(console.log('Usuarios cargados'));
                }
            });

        });
    });
}
     eliminaUsuarios()
    .then(eliminaAnuncios)
    .then(CargaUsuarios)
    .then(CargaAnuncios)
    .then(function () {
        process.exit();
    })
    .catch(function (err) {
        console.log("Error", err);
    });