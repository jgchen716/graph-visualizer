const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./algorithm_results.db');

const PORT = 3001 || process.env.PORT;

var cors = require('cors')

app.use(cors())
app.use(express.json());

db.run("CREATE TABLE IF NOT EXISTS algorithm_results (id int IDENTITY(1,1) PRIMARY KEY, algorithm text NOT NULL, result text NOT NULL)");

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Hello world!" });
});

app.get("/results", (req, res) => {
    db.all("SELECT algorithm, result FROM algorithm_results",
        (error, rows) => {
            rows.forEach((row) => {
                console.log(row.algorithm + ": " + row.result);
            })
        });
});

app.post("/results", (req, res) => {
    db.run('INSERT INTO algorithm_results(algorithm, result) VALUES(?, ?)', [req.body.algorithm, req.body.result], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Row was added to the table');
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});