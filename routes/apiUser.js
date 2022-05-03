const {Router} = require('express');
const router = Router();

const {index, show} = require('../controllers/api/users.js');

router.get('/', index);
router.get('/:id', show)

module.exports = router;