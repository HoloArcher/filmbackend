const express = require('express')
const knex = require('./knex')

const app = express()



var port = '1337'
app.listen(port, console.log('listening on port ' + port))
app.use(express.json())

app.get('/api/', async (req, res) => {
    console.log('kek');
    var result;

    result = await knex('items')
        .select('*')

    console.log(result)
    res.send({
        headers: [
            {
                text: 'id',
                value: 'id'
            },
            {
                text: 'name',
                value: 'name'
            },
            {
                text: 'rating',
                value: 'rating'
            },
        ],
        items: result
    })
})