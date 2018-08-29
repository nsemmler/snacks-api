const snacks = require('../../models/snacks')

describe('Snack Model', () => {
  describe('index()', () => {
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
})
