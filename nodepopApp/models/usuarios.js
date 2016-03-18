"use strict";
//var conn = require('../lib/connectDB');
var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

/*usuarioSchema.statics.list = function (sort, cb) {
    //Preparamos la query sin ejecutarla:
    var query = Usuario.find({});
    //añadimos más parámetros a la query:
    query.sort(sort);
    //La ejecutamos:
    query.exec(function (err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, rows);
        return;
    });
}*/



var Usuario = mongoose.model('Usuario', usuarioSchema);