const pg = require('pg')

const client = new pg.Client('postgres://localhost/pet_finder')

const express = require('express')
const app = express()

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
           SELECT *
           FROM things
        `
        const response = await client.query(SQL)
        console.log(response)

    } catch (error) {

    }
})

const init = async() => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
    );
    INSERT INTO pet (name) VALUES ('Tiny');
    INSERT INTO pet (name) VALUES ('Smokey');
    INSERT INTO pet (name) VALUES ('Max');
    INSERT INTO pet (name) VALUES ('Blaze');
    INSERT INTO pet (name) VALUES ('Milo');
    `
    await client.query(SQL)
    console.log("table created")

    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })


}

init()