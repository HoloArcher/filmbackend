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
app.post('/api/', async (req, res) => {

    var id = await knex('items').select('id').orderBy('id', "desc")

    await knex('items').insert(
        { id: id[0].id + 1, name: req.body.name, rating: req.body.rating }
    )

    var result = await knex('items')
        .select('*')

    res.send(result)

    res.end()
})