"use strict";
var basicAuth = require('basic-auth');
var conn = require('../lib/connectDB');
var mongoose = require('mongoose');
var hash = require('hash.js');
var Usuario = mongoose.model('Usuario');
var fn = function () {
    return function (req, res, next) {
        var userReq = basicAuth(req) || "";
        var usuario = Usuario.find({
            nombre: userReq.name
        });
        usuario.exec(function (err, rows) {
            if (err) {
                //cb(err);
                return;
            }
            //console.log(rows[0].clave, "rows");
            //console.log(userReq.pass);
            console.log(rows);
            var tengo = rows[0] || "";
            var userReqHasheado = hash.sha256().update(userReq.pass).digest('hex');
            console.log(userReq.pass);
            if (!userReq || userReqHasheado !== tengo.clave) {
                //Pone un par clave valor en la cabecera de la respuesta:
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.send(401);
                return;
            }
        
            next();

        });

       

    };

};


module.exports = fn;