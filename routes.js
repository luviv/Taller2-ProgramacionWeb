const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
var cartList = [];

function createRoutes (app, db) {
    
    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');

    });

    app.get('/api/products', (request, response) => {
         // seleccionamos la colección que necesitamos
         const products = db.collection('products');

         // buscamos todos los productos
         products.find({})
             // transformamos el cursor a un arreglo
             .toArray((err, result) => {
                 // asegurarnos de que no hay error
                 assert.equal(null, err);
                 
                 //Si el resultado tiene algo, entonces se pasa la información
                 response.send(result);
                 console.log(result);
             });
        
    })

    app.get('/products', (request, response) => {
        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error
                assert.equal(null, err);
                
                var context = {
                    products: result
                };

                response.render('product',context);
            });
       
   });

   app.get('/api/cart', (request, response) => {
        const cart = db.collection('cart');
        cart.find({})
        .toArray((err, result) => {
            assert.equal(null, err);

            var context = {
                cart: result[0]
            }
            response.render('cart', context);
        });

        
   });

   app.post('/api/cart', (request, response) => {
       const products = db.collection('cart');
       products.find({})
        .toArray((err, result) => {
            assert.equal(null, err);
            var cart = result[0];
            cart.products.push(request.body.productId);
            console.log(cart);

            products.updateOne({_id: new ObjectID(cart._id)}, 

            {
                $set: {products: cart.products}
            }
            );

            response.send({
                message: 'ok',
                cart
            });
        });
   });

   app.get('/products/:id', (request, response) => {
       var id = request.params.id;
       console.log(id);

       var products = db.collection('products');
       products.find({"_id": new ObjectID(id)})
        .toArray((err, result) => {
            assert.equal(null, err);
                
                var context = {
                    product: result[0]
                };

                console.log(context);
                response.render('productdetail', context);
        });
   });

    app.post('/api/products', (request, response) => {
        console.log(request.body);

        const products = db.collection('products');
        products.insert(request.body);

        response.send({
            message: 'ok',
        });
    });

    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        var query= {};        
        
        var esId=false;
        var cont=1;
        var common=false;
        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;  
                    var i=0;
                    
                    for(i;i<cartList.length;i++){
                        
                        if (request.params.id.toString()===cartList[i]._id.toString()){
                            
                            common=true;
                            
                            cartList[i].cantidad+=1;
                            console.log(cartList[i].cantidad);
                        } 
                    }
                    if(common!=true){
                        console.log(result[c].cantidad=cont);
                        result[c].cantidad=cont;
                        cartList.push(result[c]);
                    }
                    
                } 
            }
            
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartSize: cartList.length
                });
                return;
            }
            
            
            
            response.send({
                cartSize: cartList.length
            });
            
        });
        
        
        
    });


    

}

module.exports = createRoutes;