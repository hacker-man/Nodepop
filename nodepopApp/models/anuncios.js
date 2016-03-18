"use strict";
//var conn = require('../lib/connectDB');
var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function (filtro,precio,start,limit,sort,cb) {
   if(typeof precio !== "undefined"){
       console.log(precio);
       var separacion = precio.split('-');
       console.log(precio);
       console.log(separacion.length);
       console.log(separacion[0],separacion[1] );
       if(separacion[0] != "" && separacion[1] != "" && precio !== "10-"){
           if(separacion[0]=='10' && separacion[1]=='50'){
               filtro.precio = { '$gte': '10', '$lte': '50' };
           }
           
       }else{
           if(precio =='10-'){ 
              filtro.precio = { '$gte':'10' }; console.log('bieen');
           }
           if (precio == '-50'){ 
              filtro.precio = { '$lte':'50' };
           }
           if(precio == '50'){
               filtro.precio = '50';
           }
           
       }
   }
    
    //console.log(filtro);
    //Preparamos la query sin ejecutarla:
    var query = Anuncio.find(filtro);
    query.sort(sort);
    query.skip(start);
    query.limit(limit);
    //añadimos más parámetros a la query:
    //query.sort(sort);
    //La ejecutamos:
    query.exec(function (err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, rows);
        return;
    });

}


var Anuncio = mongoose.model('Anuncio', anuncioSchema);