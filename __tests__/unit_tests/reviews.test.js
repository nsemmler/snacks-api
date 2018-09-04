const reviews = require('../../models/reviews')

describe('Review Model', () => {
  describe('getSnackReviews()', () => {
    test('is defined', () => {
      expect(reviews.getSnackReviews).toBeDefined()
    })

    // test('returns a snack review given the snack ID', async () => {
    //   const response = await reviews.getSnackReviews(4)
    //   const reviews = [{
    //       id: 4,
    //       title: 'Refined!',
    //       text: 'If it were a person I\'d say to this snack: I would share my dessert with you. I mean like, You are a champ!',
    //       rating: 5,
    //       snack_id: 4
    //     },
    //     {
    //       id: 35,
    //       title: 'Small',
    //       text: 'If it were a person I\'d say to this snack: You and Chuck Norris are on equal levels. I mean like, You make the gloomy days a little less gloomy.',
    //       rating: 3,
    //       snack_id: 4
    //     }]
    //
    //   expect(response).toBeInstanceOf(Array)
    //   expect(response).toMatch(reviews)
    //
    //   var review = response[0]
    //
    //   expect(review).toHaveProperty('id')
    //   expect(review).toHaveProperty('title')
    //   expect(review).toHaveProperty('text')
    //   expect(review).toHaveProperty('rating')
    //   expect(review).toHaveProperty('snack_id')
    // })

    test('throws reviewNotFound when given an invalid ID', async () => {
      expect.assertions(3)

      expect(reviews.getSnackReviews()).rejects.toMatchObject({ message: 'reviewNotFound' })
      expect(reviews.getSnackReviews('2')).rejects.toMatchObject({ message: 'reviewNotFound' })
      expect(reviews.getSnackReviews([4])).rejects.toMatchObject({ message: 'reviewNotFound' })
    })
  })

  describe('getReviewById()', () => {
    test('is defined', () => {
      expect(reviews.getReviewById).toBeDefined()
    })

    test('returns a specific review given its ID', async () => {
      const response = await reviews.getReviewById(8)
      const review = {
        id: 8,
        title: 'Intelligent!',
        text: 'If it were a person I\'d say to this snack: There isn\'t a thing about you that I don\'t like. I mean like, You will still be beautiful when you get older.',
        rating: 2,
        snack_id: 8
      }

      expect(response).toMatchObject(review)
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('title')
      expect(response).toHaveProperty('text')
      expect(response).toHaveProperty('rating')
      expect(response).toHaveProperty('snack_id')
    })

    test('throws snackNotFound when given an invalid ID', async () => {
      expect.assertions(4)

      await expect(reviews.getReviewById(628394)).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.getReviewById()).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.getReviewById('2')).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.getReviewById([4])).rejects.toMatchObject({ message: 'reviewNotFound' })
    })
  })

  describe('create()', () => {
    test('is defined', () => {
      expect(reviews.create).toBeDefined()
    })

    test('creates a new review', async () => {
      const snackReviews = await reviews.getSnackReviews(4)

      const newReview = await reviews.create(4, {
        title: "Incredible!",
        text: "It was the best everrr.",
        rating: 2
      })

      const review = newReview[0]
      const numReviews = await reviews.getSnackReviews(4)

      expect(review).toBeInstanceOf(Object)
      expect(review).toHaveProperty('id')
      expect(review).toHaveProperty('title')
      expect(review).toHaveProperty('text')
      expect(review).toHaveProperty('rating')
      expect(review).toHaveProperty('snack_id')
      await expect(numReviews.length).toBe(snackReviews.length + 1)
    })

    test('throws reviewNotFound when given invalid Snack ID', async () => {
      expect.assertions(3)

      await expect(reviews.create({
        title: "Incredible!",
        text: "It was the best everrr.",
        rating: 2
      })).rejects.toMatchObject({ message: 'reviewNotFound' })

      await expect(reviews.create('1', {
        title: "Incredible!",
        text: "It was the best everrr.",
        rating: 2
      })).rejects.toMatchObject({ message: 'reviewNotFound' })

      await expect(reviews.create([1, 2, 3], {
        title: "Incredible!",
        text: "It was the best everrr.",
        rating: 2
      })).rejects.toMatchObject({ message: 'reviewNotFound' })
    })

    test('throws aFieldRequired when provided invalid params', async () => {
      expect.assertions(3)

      await expect(reviews.create(1, {
        rating: 2
      })).rejects.toMatchObject({ message: 'aFieldRequired' })

      await expect(reviews.create(1, {
        title: "Indescribible!",
        rating: 2
      })).rejects.toMatchObject({ message: 'aFieldRequired' })

      await expect(reviews.create(1, {
        title: "Incredible!",
        text: "text",
        username: "goldilocks",
        rating: 2
      })).rejects.toMatchObject({ message: 'aFieldRequired' })
    })
  })

  describe('update()', () => {
    test('is defined', () => {
      expect(reviews.update).toBeDefined()
    })
  })

  describe('destroy()', () => {
    test('is defined', () => {
      expect(reviews.destroy).toBeDefined()
    })
  })

  //   test('throws superfluousSnackFields when missing params', async () => {
  //     expect.assertions(1)
  //
  //     await expect(reviews.create({
  //       name: "Donut",
  //       description: "A fresh, glazed Krispy Kreme donut",
  //       price: 1,
  //       img: "https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg",
  //       is_perishable: true,
  //       test: true
  //     })).rejects.toMatchObject({ message: 'superfluousSnackFields' })
  //   })
  // })
  //
  // describe('update()', async () => {
  //   test('is defined', () => {
  //     expect(reviews.update(1, {
  //       name: "Donut",
  //       description: "A fresh, glazed Krispy Kreme donut",
  //       price: 1,
  //       img: "https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg",
  //       is_perishable: true
  //     })).toBeDefined()
  //   })
  //
  //   test('identifies a particular snack given its ID and updates it', async () => {
  //     const response = await reviews.update(1, {
  //       name: "New Name"
  //     })
  //
  //     const expected = {
  //       id: 1,
  //       name: 'New Name',
  //       description: 'Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
  //       price: 8,
  //       img: 'https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg',
  //       is_perishable: true
  //     }
  //
  //     expect(response).toBeInstanceOf(Array)
  //     expect(response[0]).toBeInstanceOf(Object)
  //     expect(response[0]).toMatchObject(expected)
  //     expect(response[0]).toHaveProperty('id')
  //     expect(response[0]).toHaveProperty('name')
  //     expect(response[0]).toHaveProperty('description')
  //     expect(response[0]).toHaveProperty('price')
  //     expect(response[0]).toHaveProperty('img')
  //     expect(response[0]).toHaveProperty('is_perishable')
  //     expect(response[0].name).toEqual('New Name')
  //   })
  //
  //   test('throws snackNotFound when invalid ID provided', async () => {
  //     expect.assertions(3)
  //
  //     await expect(reviews.update('1', { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
  //     await expect(reviews.update([1], { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
  //     await expect(reviews.update(null, { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
  //   })
  //
  //   test('throws aFieldRequired when no snack body provided', async () => {
  //     expect.assertions(1)
  //
  //     await expect(reviews.update(1, {})).rejects.toMatchObject({ message: 'aFieldRequired' })
  //   })
  //
  //   test('throws superfluousSnackFields when snack body provided with invalid key/value pair(s)', async () => {
  //     expect.assertions(1)
  //
  //     await expect(reviews.update(1, { notSnackKey: "value" })).rejects.toMatchObject({ message: 'superfluousSnackFields' })
  //   })
  // })
  //
  // describe('destroy()', async () => {
  //   test('is defined', () => {
  //     expect(reviews.destroy(1)).toBeDefined()
  //   })
  //
  //   test('deletes a snack by ID', async () => {
  //     const initialreviewsLength = await reviews.index()
  //     const response = await reviews.destroy(1)
  //     const numreviews = await reviews.index()
  //
  //     expect(response).toBeTruthy()
  //     await expect(numreviews.length).toBe(initialreviewsLength.length - 1)
  //   })
  //
  //   test('throws snackNotFound when invalid ID provided', async () => {
  //     expect.assertions(3)
  //
  //     await expect(reviews.destroy()).rejects.toMatchObject({ message: 'snackNotFound' })
  //     await expect(reviews.destroy('1')).rejects.toMatchObject({ message: 'snackNotFound' })
  //     await expect(reviews.destroy([1])).rejects.toMatchObject({ message: 'snackNotFound' })
  //   })
  // })
})
