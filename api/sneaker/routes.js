const router = require('express').Router();
const { info } = require("./controller");

router.get('/', info);
router.get('/:brand', info);
router.get('/:brand/:model', info);
router.get('/:brand/:model/:detail', info);
router.get('/:brand/:model/:color/:size', info);

module.exports = router;