const router = require('express').Router();
const userController = require('../controllers/UserController');
router.get('/findall', userController.findAll);
router.delete('/:id/delete', userController.delete);
router.get('/:id/find', userController.find);
//update user
// delete user
// get a user
router.put('/:id', userController.update);

module.exports = router;
