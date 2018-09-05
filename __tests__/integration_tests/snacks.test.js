const app = require('../../app')
const request = require("supertest")
require('dotenv').load()

describe('/snacks', () => {
  describe('GET /snacks', () => {
    test('should list all snacks', async (done) => {
      var response = await request(app).get("/api/snacks")
      snacks = response.body.data

      expect(snacks).toBeInstanceOf(Array)
      expect(response.statusCode).toBe(201)
      expect(response.type).toEqual("application/json")
      expect(snacks[0]).toHaveProperty("name", "Pork Rinds")
      expect(snacks[0]).toHaveProperty("description", "Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.")
      expect(snacks[0]).toHaveProperty("price", 8)
      expect(snacks[0]).toHaveProperty("img", "https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg")
      expect(snacks[0]).toHaveProperty("is_perishable", true)
      done()
    })
  })

  describe('POST /snacks', () => {
    test('creates a new snack', async (done) => {
      var response = await request(app).post("/api/snacks")
        .send({
          name: "Donut",
          description: "A fresh, glazed Krispy Kreme donut",
          price: 1,
          img: "https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg",
          is_perishable: true
        })
      const newSnack = response.body.data

      expect(newSnack).toBeInstanceOf(Array)
      expect(newSnack[0]).toBeInstanceOf(Object)
      expect(response.statusCode).toBe(201)
      expect(response.type).toEqual("application/json")
      expect(newSnack[0]).toHaveProperty('name', 'Donut')
      expect(newSnack[0]).toHaveProperty('description', 'A fresh, glazed Krispy Kreme donut')
      expect(newSnack[0]).toHaveProperty('price', 1)
      expect(newSnack[0]).toHaveProperty('img', 'https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg')
      expect(newSnack[0]).toHaveProperty('is_perishable', true)
      done()
    })
  })

  describe('GET /snacks/featured', () => {
    test('returns 3 featured snacks', async (done) => {
      var response = await request(app).get("/api/snacks/featured")
      var featured = response.body.data

      expect(featured).toBeInstanceOf(Array)
      expect(featured).toHaveLength(3)
      expect(response.statusCode).toBe(201)
      expect(response.type).toEqual("application/json")
      expect(featured[0]).toHaveProperty('id')
      expect(featured[0]).toHaveProperty('name')
      expect(featured[0]).toHaveProperty('description')
      expect(featured[0]).toHaveProperty('price')
      expect(featured[0]).toHaveProperty('img')
      expect(featured[0]).toHaveProperty('is_perishable')
      done()
    })
  })

  describe('GET /snacks/:id', () => {
    test('returns a snack given its ID', async (done) => {
      var response = await request(app).get("/api/snacks/1")
      snack = response.body.data

      expect(snack).toBeInstanceOf(Object)
      expect(response.statusCode).toBe(201)
      expect(response.type).toEqual("application/json")
      expect(snack).toHaveProperty("name", "Pork Rinds")
      expect(snack).toHaveProperty("description", "Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.")
      expect(snack).toHaveProperty("price", 8)
      expect(snack).toHaveProperty("img", "https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg")
      expect(snack).toHaveProperty("is_perishable", true)
      done()
    })
  })

  describe('PATCH /snacks/:id', () => {
    test('updates a snack given its ID', async (done) => {
      var response = await request(app).patch("/api/snacks/1")
        .send({
          name: "Something Holy"
        })

      const modifiedSnack = [{
        "description": "Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
        "id": 1,
        "img": "https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg",
        "is_perishable": true,
        "name": "Something Holy",
        "price": 8
      }]

      const updatedSnack = response.body.data

      expect(updatedSnack).toBeInstanceOf(Object)
      expect(updatedSnack).toMatchObject(modifiedSnack)
      expect(response.statusCode).toBe(200)
      expect(response.type).toEqual("application/json")
      done()
    })
  })

  // describe('DELETE /snacks/:id', () => {
  //   test('destroys a snack given its ID', async (done) => {
  //     const response = await request(app).del("/api/snacks/4")
  //     expect(response.statusCode).toBe(202)
  //   })
  // })
})
