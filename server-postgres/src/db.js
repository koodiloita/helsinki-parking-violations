const pgp = require('pg-promise')({})

let db = null
const CONNECTION = {
  host: 'localhost',
  port: 5432,
  database: 'parking',
  user: 'parking_app',
  password: 'parking123!'
}

const initializeDb = () => {
  console.log('Initializing DB connection ...')
  db = pgp(CONNECTION)
}

const getAddress = (addressId) => {
  return db.one('SELECT id, title, lat, lon FROM address WHERE id = $1', [addressId])
}

const getAddressViolationCounts = (addressId) => {
  return db.any('SELECT id, year, month, count FROM violation_count WHERE address_id = $1', [addressId])
}

const getViolationCounts = (year, month) => {
  return db.any(`SELECT v.id, v.year, v.month, v.count, a.id AS address_id, a.title, a.lat, a.lon
    FROM violation_count v
    LEFT JOIN address a ON v.address_id = a.id
    WHERE v.year = $1 AND v.month = $2`, [year, month])
}

module.exports = {
  initializeDb,
  getAddress,
  getAddressViolationCounts,
  getViolationCounts
}
