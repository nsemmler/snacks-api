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

    test('identifies a particular review given its ID and updates it', async () => {
      const response = await reviews.update(4, 4, {
        title: "Updated Title"
      })

      const expected = {
        id: 4,
        title: 'Updated Title',
        text: 'If it were a person I\'d say to this snack: I would share my dessert with you. I mean like, You are a champ!',
        rating: 5,
        snack_id: 4
      }

      expect(response).toBeInstanceOf(Array)
      expect(response[0]).toBeInstanceOf(Object)
      expect(response[0]).toMatchObject(expected)
      expect(response[0].title).toEqual('Updated Title')
    })

    test('throws reviewNotFound when invalid Snack ID or Review ID provided', async () => {
      expect.assertions(6)

      await expect(reviews.update(4, '1', { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.update(4, [1], { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.update(4, null, { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.update('1', 4, { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.update([1], 4, { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.update(null, 4, { title: "Updated Title" })).rejects.toMatchObject({ message: 'reviewNotFound' })
    })

    test('throws aFieldRequired when invalid body provided', async () => {
      expect.assertions(1)

      await expect(reviews.update(4, 4)).rejects.toMatchObject({ message: 'aFieldRequired' })
    })

    test('throws superfluousSnackFields when snack body provided with invalid key/value pair(s)', async () => {
      expect.assertions(1)

      await expect(reviews.update(4, 4, { notSnackKey: "value" })).rejects.toMatchObject({ message: 'superfluousReviewFields' })
    })
  })

  describe('destroy()', () => {
    test('is defined', () => {
      expect(reviews.destroy).toBeDefined()
    })

    test('deletes a review by ID', async () => {
      const snackReviewsBeforeDeletion = await reviews.getSnackReviews(4)

      const response = await reviews.destroy(4, 4)
      const snackReviewsAfterDeletion = await reviews.getSnackReviews(4)

      expect(response).toBeTruthy()
      await expect(snackReviewsAfterDeletion.length).toBe(snackReviewsBeforeDeletion.length - 1)
    })

    test('throws snackNotFound when invalid Snack or Review ID provided', async () => {
      expect.assertions(6)

      await expect(reviews.destroy(4, '1')).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.destroy(4, [1])).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.destroy(4, null)).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.destroy('1', 4)).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.destroy([1], 4)).rejects.toMatchObject({ message: 'reviewNotFound' })
      await expect(reviews.destroy(null, 4)).rejects.toMatchObject({ message: 'reviewNotFound' })
    })
  })
})
