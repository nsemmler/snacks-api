const app = require('../../app')
const request = require("supertest")
require('dotenv').load()

describe('/reviews', () => {
  describe('POST /reviews', () => {
    test('creates a new review', async (done) => {
      var response = await request(app).post("/api/snacks/1/reviews")
        .send({
          title: "Yum",
          text: "The 'love urslf 2 death chocolate cake' was ok",
          rating: 1,
          snack_id: 4
        })

      const newSnack = response.body.data

      expect(newSnack).toBeInstanceOf(Array)
      expect(newSnack[0]).toBeInstanceOf(Object)
      expect(response.statusCode).toBe(201)
      expect(response.type).toEqual("application/json")
      expect(newSnack[0]).toHaveProperty('title', 'Yum')
      expect(newSnack[0]).toHaveProperty('text', "The 'love urslf 2 death chocolate cake' was ok")
      expect(newSnack[0]).toHaveProperty('rating', 1)
      expect(newSnack[0]).toHaveProperty('snack_id', 4)
      done()
    })

    test('should throw status 400 if given a invalid body', async () => {
      var response = await request(app).post("/api/snacks/1/reviews")
        .send({
          title: "Yum"
        })

      expect(response.statusCode).toBe(400)
    })

    test('should throw status 404 if request send to incorrect url', async () => {
      var responseOne = await request(app).post("/api/snacks/-2.2/reviews")
        .send({
          title: "Yum",
          text: "The 'love urslf 2 death chocolate cake' was ok",
          rating: 1,
          snack_id: 4
        })

      expect(responseOne.statusCode).toBe(404)
    })
  })

  describe('PATCH /reviews/:revId', () => {
    test('updates a review given its ID', async (done) => {
      var response = await request(app).patch("/api/snacks/3/reviews/3")
        .send({
          title: "Something Holy"
        })

      const modifiedSnack = [{
        id: 3,
        title: "Something Holy",
        text: "If it were a person I'd say to it: Learn from your parents' mistakes - use birth control! I mean like, I thought of you all day today. I was at the zoo.",
        rating: 2,
        snack_id: 3
      }]

      const updatedSnack = response.body.data

      expect(updatedSnack).toBeInstanceOf(Object)
      expect(updatedSnack).toMatchObject(modifiedSnack)
      expect(response.statusCode).toBe(200)
      expect(response.type).toEqual("application/json")
      done()
    })

    test('should throw status 400 if given a bad request', async () => {
      var responseOne = await request(app).patch("/api/snacks/-2.2/reviews/1").send({ name: "Natey" })
      var responseTwo = await request(app).patch("/api/snacks/[]/reviews/1").send({ name: "Natey" })
      var responseThree = await request(app).patch("/api/snacks/one/reviews/1").send({ name: "Natey" })

      var responseFour = await request(app).patch("/api/snacks/1/reviews/-1").send({ name: "Natey" })
      var responseFive = await request(app).patch("/api/snacks/1/reviews/two").send({ name: "Natey" })
      var responseSix = await request(app).patch("/api/snacks/1/reviews/{4: 3}").send({ name: "Natey" })

      expect(responseOne.statusCode).toBe(400)
      expect(responseTwo.statusCode).toBe(400)
      expect(responseThree.statusCode).toBe(400)
      expect(responseFour.statusCode).toBe(400)
      expect(responseFive.statusCode).toBe(400)
      expect(responseSix.statusCode).toBe(400)
    })
  })

  describe('DELETE /reviews/:revId', () => {
    test('destroys a review given its ID', async () => {
      const response = await request(app).del("/api/snacks/4/reviews/4")
      expect(response.statusCode).toBe(202)
    })

    test('should throw status 404 if given a bad request', async () => {
      var response = await request(app).del("/api/snacks/four/reviews/four")

      expect(response.statusCode).toBe(404)
    })
  })
})
