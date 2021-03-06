const UserService = require('../services/user.service')
const userfactory = require('../factories/user.factory')
const User = require('../models/user')
const getUsers = async function (req, res, next) {
  const users = await UserService.getUsers()
  return res.send(users)
}

const createUser = async (req, res) => {
  try {
    const test = await userfactory.create(req.body)
    //console.log(test)
    
    const result = await UserService.addUser(req.body)
    res.send(result)
  } catch (error) {
    res.status(409).json( {error: error.message})
  }
}

const loginUser = async (req, res) => {
  try {
    const {user,token} = await UserService.login(req.body.email, req.body.password)
    res.send({user,token})
  } catch (error) {
    res.status(401).send(error.message)
  }
}

module.exports = { getUsers, createUser, loginUser }
