// const request = require('supertest')
// const chai = require('chai')
// const app = require('../app')

// chai.should()

// describe('Pokemon API',() => {
//     describe('GET /', () => {
//         it('should return 200 OK with "Hello World"',(done) =>{
//             request(app).get('/').expect(200).end((err,res)=>{
//                 res.body.should.deep.equal({message:'Hello World'})
//                 done()
//             })
//         })
//     })

//     describe('GET /pokemon/:id', () => {
//         it('should return 200 OK with Pokemon id"',(done) =>{
//             request(app).get('/pokemon/1').expect(200).end((err,res)=>{
//                 res.body.should.to.be.a('Object')
//                 res.body.should.have.property('id')
//                 res.body.should.have.property('name')
//                 res.body.should.have.property('type')
//                 res.body.should.have.property('type2')
//                 done()
//             })
//         })

//         it('should return 400 Bad Request"',(done) =>{
//             request(app).get('/pokemon/99').expect(400).end((err,res)=>{
//                 res.body.should.deep.equal({error:'The pokemon could not be found'})
//                 done()
//             })
//         })
//     })

//     describe('POST /pokemons', () => {
//         it('should return 201 Create and have new pokemon',(done) =>{
//             request(app).post('/pokemons')
//             .send({name: 'test',type:'test'})
//             .set('Accept', 'application/json')
//             .expect(201,done)
//         })

//         it('should return 400 Bad Request When missed required field',(done) =>{
//             request(app).post('/pokemons')
//             .expect(400).end((err,res)=>{
//                 res.body.should.deep.equal({error:'Insufficient parameter: name and type are required parameter'})
//                 done()
//             })
//         })
//     })

//     describe('PUT /pokemon/:id', () => {
//         it('should return 200 OK and the pokemon has type2',(done) =>{
//             request(app).put('/pokemon/1')
//             .send({type2:'test'})
//             .set('Accept', 'application/json')
//             .expect(200,done)
//         })

//         it('should return 400 Bad Request When try to update not existed pokemon',(done) =>{
//             request(app).put('/pokemon/1')
//             .expect(400).end((err,res)=>{
//                 res.body.should.deep.equal({error:'Insufficient parameter: type2 are required parameter'})
//                 done()
//             })
//         })
//     })
// })

// // describe('Pokemon API',() => {
// //     it('GET /pokemons shold return list of pokemon',(done)=>{
// //         request('http://localhost:3000').get('/pokemons').expect(200).end((err,res)=>{
// //             res.body.should.be.a('array')
// //             done()
// //         })
// //     })
// // }) test server

// // describe('Pokemon API',() => {
// //     it('GET /pokemons shold return list of pokemon',(done)=>{
// //         nock('http://localhost:3000').get('/pokemons')
// //         .reply(200,[
// //             {name:'test',type:'test'}
// //         ])
// //     })
// // })


// // deep คือเครื่องหมาย ===
// // https://www.chaijs.com/api/bdd/