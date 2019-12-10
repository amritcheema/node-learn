var express = require('express');
var router = express.Router();
var db = require('./database');
var productList = [];

router.get('/', function(req,res,next){

    db.query('SELECT * FROM products', function(error, results, fields) {
        if(error) {
            console.log(error); 
            res.json({"error":true});
        } else { 	
            res.write('<html><head></head><body><table style="width:50%"><tr><th>id</th><th>productName</th><th>price</th><th>quantity</th></tr>');
              for(let i = 0; i < results.length; i++){
                id = results[i].id;
                productName = results[i].Product_name;
                price = results[i].Price;
                quantity = results[i].Quantity;

                res.write('<tr><th>'+id+'</th><th>'+productName+'</th><th>'+price+'</th><th>'+quantity+'</th></tr>');
             }
             res.end('</table></body></html>');
        }
    });
});
router.get('/about', function(req, res){
    res.send('about', {
      title: 'About'
    });
  });
module.exports = router;