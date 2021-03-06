var exphbs  = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const createRoutes = require('./routes.js');

// importar file system
var fs = require('fs');
const app = express();

//lineas de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));
// definir una carpeta como pública
app.use(express.static('public'));


const url = 'mongodb+srv://finalweb:finalweb123@cluster0-xhwiv.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'store';
const client = new MongoClient(url);

// conectar el cliente de mongo
client.connect(function(err) {
    // asegurarnos de que no existe un error
    assert.equal(null, err);

    console.log('conexión');

    // conectamos el cliente a la base de datos que necesitamos
    const db = client.db(dbName);

  
    createRoutes(app, db);

    app.listen(process.env.PORT || 5000, () => {
        console.log('listening');
    });

});