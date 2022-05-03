const {Router} = require('express');
const router = Router();

const {index, show} = require('../controllers/api/products');

router.get('/', index);
router.get('/:id', show)

module.exports = router;