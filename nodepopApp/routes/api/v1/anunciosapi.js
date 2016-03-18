"user strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var hash = require('hash.js');
var auth = require('../../../lib/autenticacion');
var Usuario = mongoose.model('Usuario');
var Anuncio = mongoose.model('Anuncio');
/**
 * @api {get} /anuncios/ Información de respuesta de los anuncios
 * @apiName GetAnuncios
 * @apiVersion 1.0.0
 * @apiGroup Anuncios
 *@apiParam {String} precio 
  Valor:10‐50, buscará anuncios con precio incluido entre estos valores.
  Valor: 10‐ buscará los que tengan precio mayor que 10.
  Valor:‐50 buscará los que tengan precio menor de 50. 
  Valor:50 buscará los que tengan precio igual a 50.
 *@apiParam {String} nombre  nombre de artículo, que empiece por el dato buscado en el parámetro nombre.
 *@apiParam {String} venta  tipo de anuncio (venta o búsqueda), podemos usar un parámetro en query string llamado venta que tenga true o false
 *@apiParam {String} tag por tag, tendremos que buscar incluyendo una condición por tag
 *@apiParam {String} sort ordena por el campo indicado en sort
 *@apiParam {String} start Empieza a paginar en el valor que tenga start
 *@apiParam {String} limit Termina de paginar en el valor que tenga limit
 * @apiSuccess {String} _id id único por cada anuncio.
 * @apiSuccess {String} nombre Nombre anuncio.
 * @apiSuccess {Boolean} venta  Se busa o esta en venta.
 * @apiSuccess {Number} precio  Precio venta.
 * @apiSuccess {String} foto  Foto artículos.
 * @apiSuccess {String[]} tags  Tags del anuncio.
 * @apiSuccessExample {json} Ejemplo de respuesta: 
    {
        result: true,
        rows: rows = [
            "_id" : ObjectId("56e919f7d555771009973cb5"),
            "nombre" : "Bicicleta",
            "venta" : true,
            "precio" : 230.15,
            "foto" : "bici.jpg",
            "tags" : [ 
            "lifestyle", 
            "motor"
            ],
          etc...,
        ]
    }
 *
 *@apiError result hubo un error al realizar la consulta: false
 *@apiError err error que se ha producido
 *@apiErrorExample {json} Ejemplo de respuesta: 
    {
       result: false,
       err: err  
    }
*/

router.get('/', auth(), function (req, res) {
    var venta = req.query.venta;
    var precio = req.query.precio;
    var nombre = req.query.nombre;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 100;
    var sort = req.query.sort || 'name'; //Por defecto ordena por nombre
    var filtro = {};
    if (typeof req.query.tag !== "undefined")
        filtro.tags = req.query.tag;
    if (typeof venta !== "undefined")
        filtro.venta = venta;
    if (typeof nombre !== "undefined")
        filtro.nombre = new RegExp('^' + nombre, "i");


    Anuncio.list(filtro, precio, start, limit, sort, function (err, rows) {
        if (err) {
            res.json({
                result: false,
                err: err
            });

            return;
        }
        //Cuando esten disponibles los mando en JSON
        res.json({
            result: true,
            rows: rows
        });

    });
});
/**

 *@api {get} /anuncios/tags/ Información de respuesta de los tags
 *@apiName GetTagsAnuncios
 *@apiGroup Anuncios
 *@apiVersion 1.0.0
 *@apiSuccess {String[]} tags lista con los tags sin repetir de los anuncios
 *@apiSuccessExample {json} Ejemplo de respuesta: 
    {
       tags: arrayTags.unique() 
    }
 */
router.get('/tags', function (req, res) {
    //Para eliminar repetidos:
    Array.prototype.unique = function (a) {
        return function () {
            return this.filter(a);
        }
    }(function (a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    var anuncio = Anuncio.find({});

    anuncio.exec(function (err, rows) {
        if (err) {
            return;
        }
        var arrayTags = [];
        var numTags = 0;
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].tags.length; j++) {
                arrayTags[numTags] = rows[i].tags[j];
                numTags++;
            }
        }
        res.json({
            tags: arrayTags.unique()
        });
    });
});
/**
 *@api {post} /anuncios/ Envío de Información de registro de los usuarios
 *@apiName PostUser
 *@apiGroup Usuarios
 *@apiVersion 1.0.0
 *@apiParam {String} nombre nickname del usuario
 *@apiParam {String} email  dirección e-mail del usuario
 *@apiParam {String} clave  contraseña de registro del usuario
 *@apiSuccess result  hubo un error al guardar la consulta: false. Pero el usuario a registrar era valido
 *@apiSuccess err error que se ha producido al guardar
 *@apiSuccessExample {json} Ejemplo error al guardar: 
    {
        result: false,
        err: err
    }
 *@apiSuccess newRow elemento insertado
 *@apiSuccessExample {json} Ejemplo éxito al guardar: 
    {
         result: true,
         row: newRow
    }
 *@apiError conflict El usuario ya esta registrado
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "conflict": "UsuarioRegistrado"
 *     }

*/
//Registro de usuario en la página:
router.post('/', function (req, res) {
    //Encriptamos la password del usuario:
    //console.log("sin encriptar: ",req.body.clave);
    req.body.clave = hash.sha256().update(req.body.clave).digest('hex');
    //console.log("encriptada: ",req.body.clave);
    var user = new Usuario(req.body);
    var usuario = Usuario.find({
        nombre: req.body.nombre
    });
    usuario.exec(function (err, rows) {
        if (err) {
            //cb(err);
            return;
        }
        if (rows.length > 0) {
            res.status(409).json({
                conflict: "usuarioRegistrado"
            });
        } else {
            //Lo guardamos en la db:
            user.save(function (err, newRow) {
                if (err) {
                    res.json({
                        result: false,
                        err: err
                    });
                }
                res.json({
                    result: true,
                    row: newRow
                });
            });

        }
    });
});

module.exports = router;