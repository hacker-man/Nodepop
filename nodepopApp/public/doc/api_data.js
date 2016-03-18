define({ "api": [
  {
    "type": "get",
    "url": "/anuncios/",
    "title": "Información de respuesta de los anuncios",
    "name": "GetAnuncios",
    "version": "1.0.0",
    "group": "Anuncios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "precio",
            "description": "<p>Valor:10‐50, buscará anuncios con precio incluido entre estos valores. Valor: 10‐ buscará los que tengan precio mayor que 10. Valor:‐50 buscará los que tengan precio menor de 50. Valor:50 buscará los que tengan precio igual a 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>nombre de artículo, que empiece por el dato buscado en el parámetro nombre.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "venta",
            "description": "<p>tipo de anuncio (venta o búsqueda), podemos usar un parámetro en query string llamado venta que tenga true o false</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>por tag, tendremos que buscar incluyendo una condición por tag</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>ordena por el campo indicado en sort</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Empieza a paginar en el valor que tenga start</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>Termina de paginar en el valor que tenga limit</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id único por cada anuncio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre anuncio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "venta",
            "description": "<p>Se busa o esta en venta.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "precio",
            "description": "<p>Precio venta.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto artículos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags del anuncio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta: ",
          "content": "{\n    result: true,\n    rows: rows = [\n        \"_id\" : ObjectId(\"56e919f7d555771009973cb5\"),\n        \"nombre\" : \"Bicicleta\",\n        \"venta\" : true,\n        \"precio\" : 230.15,\n        \"foto\" : \"bici.jpg\",\n        \"tags\" : [ \n        \"lifestyle\", \n        \"motor\"\n        ],\n      etc...,\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>hubo un error al realizar la consulta: false</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "err",
            "description": "<p>error que se ha producido</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta: ",
          "content": "{\n   result: false,\n   err: err  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/anunciosapi.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "get",
    "url": "/anuncios/tags/",
    "title": "Información de respuesta de los tags",
    "name": "GetTagsAnuncios",
    "group": "Anuncios",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>lista con los tags sin repetir de los anuncios</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de respuesta: ",
          "content": "{\n   tags: arrayTags.unique() \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/anunciosapi.js",
    "groupTitle": "Anuncios"
  },
  {
    "type": "post",
    "url": "/anuncios/",
    "title": "Envío de Información de registro de los usuarios",
    "name": "PostUser",
    "group": "Usuarios",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>nickname del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>dirección e-mail del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>contraseña de registro del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>hubo un error al guardar la consulta: false. Pero el usuario a registrar era valido</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "err",
            "description": "<p>error que se ha producido al guardar</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "newRow",
            "description": "<p>elemento insertado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo error al guardar: ",
          "content": "{\n    result: false,\n    err: err\n}",
          "type": "json"
        },
        {
          "title": "Ejemplo éxito al guardar: ",
          "content": "{\n     result: true,\n     row: newRow\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "conflict",
            "description": "<p>El usuario ya esta registrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"conflict\": \"UsuarioRegistrado\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/anunciosapi.js",
    "groupTitle": "Usuarios"
  }
] });
