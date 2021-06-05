const { Client } = require('pg')

const Connect = () => {
    const Conn = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'roastprofile',
        password: 'Edison1985!',
        port: 5432
    })
    return Conn;
}
const SaveProfile = (req, res) => {
    const Conn = Connect()
    Conn.connect()

    let i = req.body;

    let Query = {
        "text": `
        INSERT INTO profiles 
        (coffee, batch, yellow, first_crack, done, chart_data)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        "values": [i.coffee, i.batch, i.yellow, i.firstCrack, i.done, i.chart]
    }
    Conn.query(Query, (err, result) => {
        if (err) { console.error("Error: ", err.stack) }
        res.status(200).json({ result: 'Roast Saved' })
    })
}

const GetBatchList = (req, res) => {
    const Conn = Connect()
    Conn.connect()

    let i = req.body;

    let Query = {
        "text":
            `SELECT id, batch FROM profiles`
    }
    Conn.query(Query, (err, result) => {
        if (err) { console.error("Error: ", err.stack) }
        res.status(200).json({ result: result })
    })
}

const GetChart = (req, res) => {
    const Conn = Connect()
    Conn.connect()

    let i = req.params;

    let Query = {
        "text":
            `SELECT id, coffee, batch, yellow, first_crack, done, chart_data 
            FROM profiles WHERE id=$1`,
        "values": [i.id]
    }
    Conn.query(Query,
        (err, result) => {
            if (err) { console.error("Error: ", err.stack) }
            res.status(200).json({ result: result.rows })
        })
}

const SaveCuppingNotes = (req, res) => {
    // // console.log('request to server: ,', req.body)
    // Conn()

    // let i = this.req.body;
    // let Query = {
    //     "text": `
    //     INSERT INTO profiles 
    //     (cupping_notes)
    //     VALUES ($1) WHERE batch=$1`,
    //     "values": [JSON.stringify(i.cuppingNotes)]
    // }
    // Conn.query(Query)
    // res.status(200).json({ result: 'Roast Saved' })
}

module.exports = { SaveProfile, GetBatchList, GetChart, SaveCuppingNotes }