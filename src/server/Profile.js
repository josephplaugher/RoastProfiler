const { Client } = require('pg')

const SaveProfile = (req, res) => {
    const Conn = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'roastprofile',
        password: 'Edison1985!',
        port: 5432
    })
    Conn.connect()

    let i = req.body;
    // let chartData = JSON.stringify(i.chart)
    // console.log('request body: ', i)
    console.log('coffee', i.coffee)
    console.log('batch', i.batch)
    console.log('yellow', i.yellow)
    console.log('chart data: ', i.chart)

    let Query = {
        "text": `
        INSERT INTO profiles 
        (coffee, batch, yellow, first_crack, done, chart_data)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        "values": [i.coffee, i.batch, i.yellow, i.firstCrack, i.done, i.chart]
    }
    Conn.query(Query, (err, result) => {
        if (err) { console.error("Error: ", err.stack) }
        console.log("result ", result)
        res.status(200).json({ result: 'Roast Saved' })
    })
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