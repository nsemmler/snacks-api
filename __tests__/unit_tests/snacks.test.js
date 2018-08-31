const snacks = require('../../models/snacks')

describe('Snack Model', () => {
  describe('index()', () => {
    test('is defined', () => {
      expect(snacks.index).toBeDefined()
    })

    test('returns all snacks in the database', async () => {
      const response = await snacks.index()
      const campbellsSoup = {
        id: 2,
        name: 'Soup - Campbells Beef Noodle',
        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.',
        price: 26,
        img: 'https://images-na.ssl-images-amazon.com/images/I/71MavWF1P9L._SY550_.jpg',
        is_perishable: false
      }

      expect(response).toBeInstanceOf(Array)
      expect(response[1]).toEqual(campbellsSoup)
    })
  })

  describe('getSnackById()', () => {
    test('is defined', () => {
      expect(snacks.getSnackById).toBeDefined()
    })

    test('returns a snack given its ID', async () => {
      const response = await snacks.getSnackById(1)
      const porkRinds = {
        id: 1,
        name: 'Pork Rinds',
        description: 'Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
        price: 8,
        img: 'https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg',
        is_perishable: true
      }

      expect(response).toMatchObject(porkRinds)
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('name')
      expect(response).toHaveProperty('description')
      expect(response).toHaveProperty('price')
      expect(response).toHaveProperty('img')
      expect(response).toHaveProperty('is_perishable')
    })

    test('throws snackNotFound when given an invalid ID', async () => {
      expect.assertions(4)

      await expect(snacks.getSnackById(628394)).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.getSnackById()).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.getSnackById('2')).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.getSnackById([4])).rejects.toMatchObject({ message: 'snackNotFound' })
    })
  })

  describe('getFeatured()', () => {
    test('is defined', () => {
      expect(snacks.getFeatured).toBeDefined()
    })

    test('returns an array of 3 randomly-selected snacks', async () => {
      const responseArr = await snacks.getFeatured()

      expect(responseArr).toBeInstanceOf(Array)
      expect(responseArr).toHaveLength(3)
      const firstSnack = responseArr[0]
      expect(firstSnack).toHaveProperty('id')
      expect(firstSnack).toHaveProperty('name')
      expect(firstSnack).toHaveProperty('description')
      expect(firstSnack).toHaveProperty('price')
      expect(firstSnack).toHaveProperty('img')
      expect(firstSnack).toHaveProperty('is_perishable')
    })
  })

  describe('generateRandomId()', () => {
    test('is defined', () => {
      expect(snacks.generateRandomId).toBeDefined()
    })

    test('generates a random number between 0 and x', () => {
      const value = snacks.generateRandomId(10)

      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(10)
    })

    test('throws invalidQuantity when given an improper params', async () => {
      expect.assertions(3)

      await expect(snacks.generateRandomId()).rejects.toMatchObject({ message: 'invalidQuantity' })
      await expect(snacks.generateRandomId(-10)).rejects.toMatchObject({ message: 'invalidQuantity' })
      await expect(snacks.generateRandomId([1, 2, 3])).rejects.toMatchObject({ message: 'invalidQuantity' })
    })
  })

  describe('create()', () => {
    test('is defined', () => {
      expect(snacks.create).toBeDefined()
    })

    test('creates a new snack', async () => {
      const initialSnacksLength = await snacks.index()
      const newSnackArr = await snacks.create({
        name: "Donut",
        description: "A fresh, glazed Krispy Kreme donut",
        price: 1,
        img: "https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg",
        is_perishable: true
      })

      const snack = newSnackArr[0]
      const numSnacks = await snacks.index()

      expect(snack).toBeInstanceOf(Object)
      expect(snack).toHaveProperty('id')
      expect(snack).toHaveProperty('name')
      expect(snack).toHaveProperty('description')
      expect(snack).toHaveProperty('price')
      expect(snack).toHaveProperty('img')
      expect(snack).toHaveProperty('is_perishable')
      await expect(numSnacks.length).toBe(initialSnacksLength.length + 1)
    })

    test('throws aFieldRequired when missing params', async () => {
      expect.assertions(1)

      await expect(snacks.create({
        name: "Pinecone",
        description: "Rich in fiber"
      })).rejects.toMatchObject({ message: 'aFieldRequired' })
    })

    test('throws superfluousSnackFields when missing params', async () => {
      expect.assertions(1)

      await expect(snacks.create({
        name: "Donut",
        description: "A fresh, glazed Krispy Kreme donut",
        price: 1,
        img: "https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg",
        is_perishable: true,
        test: true
      })).rejects.toMatchObject({ message: 'superfluousSnackFields' })
    })
  })

  describe('update()', async () => {
    test('is defined', () => {
      expect(snacks.update).toBeDefined()
    })

    test('identifies a particular snack given its ID and updates it', async () => {
      const response = await snacks.update(1, {
        name: "New Name"
      })

      const expected = {
        id: 1,
        name: 'New Name',
        description: 'Mauris lacinia sapien quis libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
        price: 8,
        img: 'https://az808821.vo.msecnd.net/content/images/thumbs/0000398_salt-pepper-pork-rinds-2-oz_560.jpeg',
        is_perishable: true
      }

      expect(response).toBeInstanceOf(Array)
      expect(response[0]).toBeInstanceOf(Object)
      expect(response[0]).toMatchObject(expected)
      expect(response[0]).toHaveProperty('id')
      expect(response[0]).toHaveProperty('name')
      expect(response[0]).toHaveProperty('description')
      expect(response[0]).toHaveProperty('price')
      expect(response[0]).toHaveProperty('img')
      expect(response[0]).toHaveProperty('is_perishable')
      expect(response[0].name).toEqual('New Name')
    })

    test('throws snackNotFound when invalid ID provided', async () => {
      expect.assertions(3)

      await expect(snacks.update('1', { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.update([1], { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.update(null, { name: "New Name" })).rejects.toMatchObject({ message: 'snackNotFound' })
    })

    test('throws aFieldRequired when no snack body provided', async () => {
      expect.assertions(1)

      await expect(snacks.update(1, {})).rejects.toMatchObject({ message: 'aFieldRequired' })
    })

    test('throws superfluousSnackFields when snack body provided with invalid key/value pair(s)', async () => {
      expect.assertions(1)

      await expect(snacks.update(1, { notSnackKey: "value" })).rejects.toMatchObject({ message: 'superfluousSnackFields' })
    })
  })

  describe('destroy()', async () => {
    test('is defined', () => {
      expect(snacks.destroy).toBeDefined()
    })

    test('deletes a snack by ID', async () => {
      const initialSnacksLength = await snacks.index()
      const response = await snacks.destroy(1)
      const numSnacks = await snacks.index()

      expect(response).toBeTruthy()
      await expect(numSnacks.length).toBe(initialSnacksLength.length - 1)
    })

    test('throws snackNotFound when invalid ID provided', async () => {
      expect.assertions(3)

      await expect(snacks.destroy()).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.destroy('1')).rejects.toMatchObject({ message: 'snackNotFound' })
      await expect(snacks.destroy([1])).rejects.toMatchObject({ message: 'snackNotFound' })
    })
  })
})
