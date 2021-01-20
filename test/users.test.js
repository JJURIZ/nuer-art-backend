// EXTERNAL DEPENDENCIES
const request = require('supertest')
const expect = require('chai').expect

// INTENRAL DEPENDENCIES
const app = require('../server.js')
const db = require('../models')
const users = require('../seeders/users')
const { dbUsers, tokens } = require('./server.test')

// TEST POST ROUTE FOR USER SIGNUP
describe('USERS: POST route for /signup', () => {
    it('creates new user and saves to database with a hashed password and a date field', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: users.ryan.name,
                email: users.ryan.email,
                password: users.ryan.password,
                address1: users.ryan.address1,
                address2: users.ryan.address2,
                city: users.ryan.city,
                state: users.ryan.state,
                zip: users.ryan.zip,
            })
        const foundUser = await db.User.findOne({
            email: users.ryan.email
        })
        expect(newUser.status).to.equal(200)
        expect(foundUser).to.exist
        expect(foundUser.password).to.not.equal(users.ryan.password)
        expect(foundUser).to.have.property('date')
    })

    it('fails to create a user if email already in use', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: users.jill.name,
                email: users.jill.email,
                password: users.jill.password
            })
        expect(newUser.body.msg).to.equal('An account with this email address already exists')
    })
})

// TEST POST ROUTE FOR LOGIN
describe('USERS: POST route for /login', () => {
    it('authenticates a user with the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.bill.email,
                password: users.bill.password
            })
        expect(currentUser.status).to.equal(200)
    })

    it('fails to authenticate a user without the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.tilly.email,
                password: 'nope'
            })
        expect(currentUser.body.msg).to.equal('Password is incorrect')
    })

    it('rejects a user without an existing account', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.noone.email,
                password: users.noone.password
            })
        expect(currentUser.body.msg).to.equal('User not found')
    })
})

// TEST GET ROUTE FOR USER/:ID
describe('USERS: GET route for /:id', () => {
    it('displays info of authenticated user', async () => {
        const currentUser = await request(app)
            .get(`/users/${dbUsers.john._id}`)
            .set('Authorization', tokens.john)
        expect(currentUser.body.user).to.have.property('_id')
    })

    it('fails to display info of unauthenticated user', async () => {
        const currentUser = await request(app)
            .get(`/users/${dbUsers.john._id}`)
            .set('Authorization', 'Bearer token')
        expect(currentUser.error).to.not.equal(false)
    })
})

// TEST DELETE FOR USER/:ID
describe('USERS: DELETE route for /:id', () => {
    it('deletes a user', async () => {
        const deletedUser = await request(app)
            .delete(`/users/${dbUsers.john._id}`)
            .set('Authorization', tokens.john)
            .send({
                _id: dbUsers.john._id
            })
        expect(deletedUser.status).to.equal(200)
    })
})