const pg = require('pg')
const client = new pg.Client('postgres://localhost/pet_finder')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
           SELECT *
           FROM pets
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)

    } catch (error) {
        next(error)

    }
})

const init = async () => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        is_favorite BOOLEAN
    );
    INSERT INTO pets (name) VALUES ('Tiny');
    INSERT INTO pets (name, is_favorite) VALUES ('Smokey', true);
    INSERT INTO pets (name) VALUES ('Max');
    INSERT INTO pets (name) VALUES ('Blaze');
    INSERT INTO pets (name) VALUES ('Milo');
    `
    await client.query(SQL)
    console.log("table created")

    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })


}

init()