// EXTERNAL DEPENDENCIES
const request = require('supertest')
const expect = require('chai').expect

// INTERNAL DEPENDENCIES
const app = require('../server')
const db = require('../models')
const users = require('../seeders/users')
const paintings = require('../seeders/paintings')

// CREATE OBJECT FOR DATA
let dbUsers = {}
let dbPaintings = {}
let tokens = {}

// DELETE DATA BEFORE PROCEEDING
before(async () => {
    await db.User.deleteMany({})
    await db.Painting.deleteMany({})
})

// CREATE TEST USERS
before(async () => {
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.jill.name,
            email: users.jill.email,
            password: users.jill.password,
            address1: users.jill.address1,
            address2: users.jill.address2,
            city: users.jill.city,
            state: users.jill.state,
            zip: users.jill.zip
        })
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.bill.name,
            email: users.bill.email,
            password: users.bill.password,
            address1: users.bill.address1,
            address2: users.bill.address2,
            city: users.bill.city,
            state: users.bill.state,
            zip: users.bill.zip
        })
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.john.name,
            email: users.john.email,
            password: users.john.password,
            address1: users.john.address1,
            address2: users.john.address2,
            city: users.john.city,
            state: users.john.state,
            zip: users.john.zip
        })
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.tilly.name,
            email: users.tilly.email,
            password: users.tilly.password,
            address1: users.tilly.address1,
            address2: users.tilly.address2,
            city: users.tilly.city,
            state: users.tilly.state,
            zip: users.tilly.zip
        })
})

// CREATE PAINTINGS
before(async () => {
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.first.url,
            title: paintings.first.title,
            price: paintings.first.price,
            qty: paintings.first.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.second.url,
            title: paintings.second.title,
            price: paintings.second.price,
            qty: paintings.second.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.third.url,
            title: paintings.third.title,
            price: paintings.third.price,
            qty: paintings.third.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.fourth.url,
            title: paintings.fourth.title,
            price: paintings.fourth.price,
            qty: paintings.fourth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.fifth.url,
            title: paintings.fifth.title,
            price: paintings.fifth.price,
            qty: paintings.fifth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.sixth.url,
            title: paintings.sixth.title,
            price: paintings.sixth.price,
            qty: paintings.sixth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.seventh.url,
            title: paintings.seventh.title,
            price: paintings.seventh.price,
            qty: paintings.seventh.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.eighth.url,
            title: paintings.eighth.title,
            price: paintings.eighth.price,
            qty: paintings.eighth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.ninth.url,
            title: paintings.ninth.title,
            price: paintings.ninth.price,
            qty: paintings.ninth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.tenth.url,
            title: paintings.tenth.title,
            price: paintings.tenth.price,
            qty: paintings.tenth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.eleventh.url,
            title: paintings.eleventh.title,
            price: paintings.eleventh.price,
            qty: paintings.eleventh.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.twelfth.url,
            title: paintings.twelfth.title,
            price: paintings.twelfth.price,
            qty: paintings.twelfth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.thirteenth.url,
            title: paintings.thirteenth.title,
            price: paintings.thirteenth.price,
            qty: paintings.thirteenth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.fourteenth.url,
            title: paintings.fourteenth.title,
            price: paintings.fourteenth.price,
            qty: paintings.fourteenth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.fifteenth.url,
            title: paintings.fifteenth.title,
            price: paintings.fifteenth.price,
            qty: paintings.fifteenth.qty,
        })
    await request(app)
        .post('/paintings/create')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            url: paintings.sixteenth.url,
            title: paintings.sixteenth.title,
            price: paintings.sixteenth.price,
            qty: paintings.sixteenth.qty,
        })
})
// LOG IN USERS PRIOR TO TESTING
before(async () => {
    const loggingJill = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.jill.email,
            password: users.jill.password
        })
    tokens.jill = loggingJill.body.token
    
    const loggingBill = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.bill.email,
            password: users.bill.password
        })
    tokens.bill = loggingBill.body.token

    const loggingJohn = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.john.email,
            password: users.john.password
        })
    tokens.john = loggingJohn.body.token

    const loggingTilly = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.tilly.email,
            password: users.tilly.password
        })
    tokens.tilly = loggingTilly.body.token
})

// FIND USERS IN DATABSE
before(async () => {
    const dbJillUser = await db.User.findOne({
        email: users.jill.email
    })
    dbUsers.jill = dbJillUser

    const dbBillUser = await db.User.findOne({
        email: users.bill.email
    })
    dbUsers.bill = dbBillUser

    const dbJohnUser = await db.User.findOne({
        email: users.john.email
    })
    dbUsers.john = dbJohnUser

    const dbTillyUser = await db.User.findOne({
        email: users.tilly.email
    })
    dbUsers.tilly = dbTillyUser
})

// TEST HOMEPAGE
describe('SERVER: GET route for /', () => {
    it('accesses backend and displays stored message', async () => {
        const user = await request(app)
            .get('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
        expect(user.status).to.equal(200)
        expect(user.body.msg).to.equal('Nuer Art Backend')
    })
})

module.exports = { dbUsers, dbPaintings, tokens }