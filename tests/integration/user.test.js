const request = require('supertest')
const User = require('../../models/user')

let server;
const endPoint = '/api/users'

const populateUser = async function(){
    await User.collection.insertMany([
        {
            name:'joshddd',
            email:'josh@mail',
            phone:'090',
            address: 'uwuwuuuwuwwu',
            sponserName: 'debo',
        },
        {
            name:'joshjjj',
            email:'josh2@mail',
            phone:'090',
            address: 'uwuwuuuwuwwu',
            sponserName: 'debo',
        }
    ])
}

//jest.setTimeout(30000)

describe("/api/users", ()=>{

    beforeEach(()=>{server = require('../../index')}) 
    afterEach(async ()=>{
        await server.close()
        await User.deleteMany({})
    })    

    describe('GET /', ()=>{

        it('should return all users', async ()=>{
            await populateUser()
            const res = await request(server).get(endPoint) 
    
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
        })
    })

    describe('POST /',()=>{
        it('should return 422 when invalid request is passed', async ()=>{
            const payload = {
                name:'joshia',
                email:'josh@mail.com'
            }
            const res = await request(server)
            .post(endPoint)
            .send(payload)

            expect(res.status).toBe(422) 
        })

        it('should return 200 when valid request is passed', async ()=>{
            const payload = {
                name:'joshia',
                email:'josh@mail.com',
                phone:'090',
                address: 'uwuwuuuwuwwu',
                sponsorName: 'debo',
                idNumber:'12345',
                state:'Lagos'
            }
            const res = await request(server)
            .post(endPoint)
            .send(payload)

            expect(res.status).toBe(200) 
        })
    })

    
    
})