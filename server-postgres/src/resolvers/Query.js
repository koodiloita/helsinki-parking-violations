const db = require('../db')

async function violationCounts(root, args, context, info) {
  const violationCounts = await db.getViolationCounts(args.year, args.month)
  return violationCounts.map((vc) => {
    return {
      id: vc.id,
      year: vc.year,
      month: vc.month,
      count: vc.count,
      address: {
        id: vc.address_id,
        title: vc.title,
        lat: vc.lat,
        lon: vc.lon
      }
    }
  })
}

async function address(root, args, context, info) {
  const address = await db.getAddress(args.id)
  const violationCounts = await db.getAddressViolationCounts(args.id)
  address.violationCounts = violationCounts
  return address
}

const info = () => `This is the API of parking data`

module.exports = {
  violationCounts,
  address,
  info
}
