async function isValidSnackCreate ({ name, description, price, img, is_perishable }) {
    if(!name|| typeof name !== 'string') throw new Error('snackNameWrong')
    if(!description || typeof description !== 'string') throw new Error('snackDescriptionWrong')
    if(!price) throw new Error('snackPriceWrong')
    if(!img || typeof img !== 'string') throw new Error('snackImgWrong')
    if(typeof is_perishable !== 'boolean') throw new Error('snackPerishableWrong')
    return true
}

async function isValidSnackPatch ({ name, description, price, img, is_perishable }) {
    if (!name && !description && !price && !img && is_perishable === undefined) throw new Error('aFieldRequired')
    return true
}

async function isValidReviewCreate ({ title, text, rating }) {
    if(!title|| typeof title !== 'string') throw new Error('titleRequired')
    if(!text || typeof text !== 'string') throw new Error('textRequired')
    if(!rating || typeof rating !== 'number' || !Number.isFinite(rating) || !Number.isInteger(rating) || rating < 0 || rating > 5) throw new Error('ratingRequired')
    return true
}

async function isValidReviewPatch ({ title, text, rating }) {
    if (!title && !text && !rating) throw new Error('aReviewFieldRequired')
    return true
}


module.exports = { isValidSnackCreate, isValidSnackPatch, isValidReviewCreate, isValidReviewPatch }
