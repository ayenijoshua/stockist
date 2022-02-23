const request = require('supertest')
const Product = require('../../models/product')



describe('/api/products', ()=>{

    let server;
    const endPoint = '/api/products'

    beforeEach(()=>{server = require('../../index')})
    afterEach(async ()=>{await server.close()})

    describe('POST /', ()=>{

        it('it should return 422 if image is not uploaded', async ()=>{
            const res = await request(server).post(endPoint)
            .field('name','cold')
            .field('title','new title')
            .field('description','good cold')
            .field('quantity',5)
            .field('price',100)
            //.attach('image',__dirname+'/images/logo.jpg')

            expect(res.status).toBe(422)
        })

        it('should return 200 if successfull', async ()=>{
            //try {
            const res = await request(server).post(endPoint)
            .field('name','cold')
            .field('title','new title')
            .field('description','good cold')
            .field('quantity',5)
            .field('price',100)
            .attach('image',__dirname+'/../images/logo.jpg')

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('imageName')

            
        })
        
    })
})