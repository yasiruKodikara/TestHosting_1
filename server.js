var express = require('express');
var app = express()

var db = require('./database.js');
var bodyParser = require('body-parser');
const {request,response} = require('express');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

let HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT,()=>{
    console.log(`server is running on ${HTTP_PORT}`)
});

//-----------------

//POST request

app.post('/api/products',(req,res,next)=>{

    try{
        var errors = [];
    
        if(!req.body){
            erros.push('No data provided!')
        }
    
        const {
            productName,
            description,
            category,
            brand,
            expireDate,
            manufactureDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate
        } = req.body;
    
        var sql = `INSERT INTO products (productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        var params = [productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createdDate];
        db.run(sql,params,function(err,result){
            if(err){
                res.status(400).json({error:err.message});
                return;
            }else{
                res.status(201).json({
                    "message":"Product created successfully!",
                    "data":res.body,
                    "id":this.lastID
                });
            }
    
    
        });
    } catch(err){
        console.error(err.message);
        res.status(400).json({error:err.message});
    };
    });
    
    //get request
    
    app.get('/api/products',(req,res,next)=>{
    
        try{
        var sql = 'SELECT * FROM products'
        var params = []
        db.all(sql,params,(err,rows)=>{
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message":"success",
                "data":rows
            });
            
        });
        }catch(err){
            console.error(err.message);
            res.status(400).json({error:err.message});
        };
    });
    
    //PUT request
    app.put('/api/products/',(req,res,next) => {
        const {
            id,
            productName,
            description,
            category,
            brand,
            expireDate,
            manufactureDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate
        } = req.body;
    
        db.run(`UPDATE products SET productName = ?, description = ?, category = ?, brand = ?, expireDate = ?, manufactureDate = ?, batchNumber = ?, unitPrice = ?, quantity = ?, createdDate = ? WHERE id = ?`, [productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createdDate, id], function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: "success",
                data: req.body,
                changes: this.changes
            });
        });
    });
    
    //DELETE request
    app.delete('/api/products/delete/:id',(req,res,next) => {
        try{
        db.run(`DELETE FROM products WHERE id=?`,req.params.id,function(err){
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }else{
                res.json({
                    "message":"product deleted successfully!",
                    rows:this.changes
                });
            }
        })}catch(err){
            res.status(400).json({error:err.message});
        }
    });
    