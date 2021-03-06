const mongodb = require('mongodb');
const connection = require('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getUsers(){
    const connectiondb = await connection.getConnection();
    const productos = await connectiondb.db('tecno')
                        .collection('usuarios')
                        .find()         
                        .toArray();                        
    return productos;
    
}

async function addUser(user){
    const connectiondb = await connection.getConnection(); 
    user.password = await bcrypt.hash(user.password, 8);
    const usuario = await connectiondb.db('tecno')
                        .collection('usuarios')
                        .findOne({email: user.email});

                        user.esAdmin = false;
    let result
    if (usuario) {
        result = "Usuario ya existente!"
        throw new Error("Usuario ya existente!")
    } else {

        result = await connectiondb.db('tecno')
                        .collection('usuarios')
                        .insertOne(user);
    }
    console.log(result)
    return result
}

async function getUser(id){
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db('tecno')
                        .collection('usuarios')
                        .findOne({_id: mongodb.ObjectId(id)});
    return user;
}

async function findByCredentials(email, password){
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db('tecno')
                        .collection('usuarios')
                        .findOne({email: email});
    if(!user){
        throw new Error('Credenciales no validas!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Credenciales no validas!!!');
    }
    return user;
}

module.exports = {addUser, getUser, findByCredentials, getUsers};