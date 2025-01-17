
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('port', 3001)
app.listen(3001, ()=>{
    console.log("Example app listening on port 3001 !")
})