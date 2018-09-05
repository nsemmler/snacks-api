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
  })

  describe('DELETE /reviews/:revId', () => {
    test('destroys a review given its ID', async () => {
      const response = await request(app).del("/api/snacks/4/reviews/4")
      expect(response.statusCode).toBe(202)
    })
  })
})
