const violationCounts = (root, args, context, info) => {
  const where = {
    AND: []
  }
  if (args.year) {
    where.AND.push({
      year: args.year
    })
  }
  if (args.month) {
    where.AND.push({
      month: args.month
    })
  }
  return context.db.query.violationCounts({ where }, info)
}

const address = (root, args, context, info) => {
  const where = {
    id: args.id
  }
  return context.db.query.address({ where }, info)
}

const info = () => `This is the API of parking data`

module.exports = {
  violationCounts,
  address,
  info
}
