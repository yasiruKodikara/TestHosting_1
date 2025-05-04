var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = 'db.sqlite'

let db = new sqlite3.Database(DBSOURCE,(err)=>{
    if(err){
        console.error(err.message);
        throw err
    }else{
        console.log('connected to the sqlite3 Database')
        db.run(
            `CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text,
            description text,
            category text,
            brand text,
            expireDate text,
            manufactureDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate text
            )
            ` ,(err)=>{
                if(err){
                    console.log('Table already created')
                }else{
                    var insert = 'INSERT INTO products (productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
                    db.run(insert,["product1","description1","category1","brand1","2023-12-31","2023-01-01",123456,100,10,"2023-01-01"])
                }
            }
        )
    }
})

module.exports = db;