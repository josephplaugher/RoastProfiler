const { Pool } = require('pg')

const Conn = () => {
    let connect = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'roastprofile',
        password: 'Edison1985!',
        port: 5432
    })
    return connect;
}

const SaveProfile = (req, res) => {
    let CR = Conn()
    CR.connect()

    let i = req.body;
    console.log('request body: ', i)

    let Query = {
        "text": `
        INSERT INTO profiles 
        (coffee, batch, yellow, first_crack, done, chart_data)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        "values": [i.coffee, i.batch, i.yellow, i.firstCrack, i.done, JSON.stringify(i.chart)]
    }
    CR.query(Query)
    res.status(200).json({ result: 'Roast Saved' })
}

const saveCuppingNotes = (req, res) => {
    // console.log('request to server: ,', req.body)

    Conn()

    let i = this.req.body;
    let Query = {
        "text": `
        INSERT INTO profiles 
        (cupping_notes)
        VALUES ($1) WHERE batch=$1`,
        "values": [JSON.stringify(i.cuppingNotes)]
    }
    Conn.query(Query)
    res.status(200).json({ result: 'Roast Saved' })
}

module.exports = { SaveProfile, saveCuppingNotes }