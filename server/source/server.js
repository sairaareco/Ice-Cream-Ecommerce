const express = require("express"); 
const morgan = require("morgan");
const { dataBase } = require("./database"); 
const router = require("./routes/route"); 
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", router);

// alter: true
dataBase
.sync({force: false})
.then(()=> {
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`);
    })
})
.catch((error) => console.log(error))

