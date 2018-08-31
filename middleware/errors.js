function processErrorMessage(err) {
    if (err.message) {
      switch (err.message) {
        case 'snackNotFound': return { status: 404, message: 'Snack with provided ID is not found' }
        case 'snackNameWrong': return { status: 400, message: 'Snack "name" must be a String and is required'}
        case 'snackDescriptionWrong': return { status: 400, message: 'Snack "description" must be a String and is required'}
        case 'snackPriceWrong': return { status: 400, message: 'Snack "price" must be an Integer (whole number, no Floats) and is required'}
        case 'snackImgWrong': return { status: 400, message: 'Snack "img" must be a String and is required'}
        case 'snackPerishableWrong': return { status: 400, message: 'Snack "is_perishable" must be a Boolean and is required'}
        case 'aFieldRequired': return { status: 400, message: 'At lease one(1) of the following fields is required: "name", "description", "price", "img", or "is_perishable"'}
        case 'aReviewFieldRequired': return { status: 400, message: 'At lease one(1) of the following fields is required: "title", "text", "rating" '}
        case 'titleRequired': return { status: 400, message: 'Review "title" must be a String and is required' }
        case 'textRequired': return { status: 400, message: 'Review "text" must be a String and is required' }
        case 'ratingRequired': return { status: 400, message: 'Review "rating" must be an Integer (whole number, no Floats between 1 and 5) and is required' }
        case 'reviewNotFound': return { status: 404, message: 'Review with provided ID is not found' }
        case 'invalidQuantity': return { status: 404, message: 'Snack quantity must be an integer' }
        case 'superfluousSnackFields': return { status: 404, message: 'Snacks must only have the following fields: "name", "description", "price", "img", or "is_perishable"' }

        default:
          return { status: 500, message: 'An internal server error has occurred.' }
      }
    }
  }


  module.exports = processErrorMessage
