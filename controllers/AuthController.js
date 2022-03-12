const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body;

			if (!(email && password)) {
				res.status(400).send('All input is required');
			}
			const user = await User.findOne({
				email,
			});
			!user && res.status(404).json('user not found');

			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			!validPassword &&
				res.status(400).json('Wrong password');
			const token = jwt.sign(
				{ userId: user._id, isAdmin: user.isAdmin },
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);
			user.token = token;
			await user.save();
			res.status(200).json({
				accessToken: token,
				username: user.username,
				userId: user._id,
			});
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async register(req, res) {
		try {
			// hash password with salt
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				salt
			);
			const newUser = await new User({
				username: req.body.username,
				email: req.body.email,
				phone: req.body.phone,
				password: hashedPassword,
				image: req.body.image,
			});
			const token = jwt.sign(
				{
					userId: newUser._id,
					isAdmin: newUser.isAdmin,
				},
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);
			newUser.token = token;
			// save user and respond
			const user = await newUser.save();
			res.status(200).json(user);
		} catch (err) {
			res.status(500).json('Can not create user');
			console.log(err);
		}
	}
}

module.exports = new AuthController();
