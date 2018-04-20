let users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Pelice'},
  {id: 3, name: 'Chris'}
]; //todo

const index = (req, res) => {
  let limit = parseInt(req.query.limit || 10)
  let isIntegerTolimit = Number.isInteger(limit)
  if (isIntegerTolimit) {
    res.status(200).json(users.slice(0, limit))
  } else {
    res.status(400).json({errMsg:'Please, request Integer'})
  }
}

const show = (req, res) => {
  const id = parseInt(req.params.id, 10)
  let isIntegerToid = Number.isInteger(id)
  if (isIntegerToid) {
    const user = users.filter(user => user.id === id)[0]
    if (!user) {
      return res.status(404).end()
    } else {
      return res.status(200).json(user)
    }
  } else {
    return res.status(400).end()
  }
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const isIntegerToid = Number.isInteger(id)
  if (isIntegerToid) {
    const user = users.filter(user => user.id !== id)
    if (!user) {
      return res.status(404).end()
    }
    return res.status(200).json(users)
  } else {
    return res.status(400).end()
  }
}

const create = (req, res) => {
  const name = req.body.name
  if (!name) {
    return res.status(400).end()
  }
   const found = users.filter(user => user.name === name).length
   if (found) {
     return res.status(409).end()
   }

   const id = Date.now()
   const user = {id, name}
   users.push(user)
   res.status(201).json(user)
}

module.exports = {
  index,
  show,
  destroy,
  create
};
