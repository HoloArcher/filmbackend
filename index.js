const express = require('express')
const knex = require('./knex')

const app = express()



var port = '1337'
app.listen(port, console.log('listening on port ' + port))
app.use(express.json())

app.get('/api/', async (req, res) => {

    var result = await get_items()

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
            {
                text: 'Actions',
                value: 'action',
                sortable: false
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

    var result = await get_items()

    res.send(result)

    res.end()
})


async function get_items() {
    return await knex('items').select('*')
}


knex.delete('/api/', async (req, res) => {

    var id = req.body.id


    var res = await knex('items').where({ id: id }).delete()

    var result = await get_items()

    res.send(result)

    res.end()
})