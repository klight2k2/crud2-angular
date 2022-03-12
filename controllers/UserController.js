const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
	async update(req, res) {
		if (
			req.user.userId === req.params.id ||
			req.user.isAdmin
		) {
			console.log(req.body);
			if (req.body.oldPassword) {
				try {
					const user = await User.findById(req.params.id);
					const validPassword = await bcrypt.compare(
						req.body.oldPassword,
						user.password
					);
					!validPassword &&
						res.status(400).json('wrong password');
					const salt = await bcrypt.genSalt(10);
					req.body.newPassword = await bcrypt.hash(
						req.body.newPassword,
						salt
					);
				} catch (err) {
					return res.status(500).json(err);
				}
			}
			try {
				const user = await User.findByIdAndUpdate(
					req.params.id,
					{
						username: req.body.username,
						password: req.body.newPassword,
						email: req.body.email,
						image: req.body.image,
					},
					{ new: true }
				);
				res.status(200).json('Account has been updated');
			} catch (err) {
				return res.status(500).json(err);
			}
		} else {
			return res
				.status(403)
				.json('You can update only your account!');
		}
	}
	async delete(req, res) {
		if (
			req.user.userId === req.params.id ||
			req.user.isAdmin
		) {
			try {
				await User.deleteOne({ _id: req.params.id });
				return res
					.status(200)
					.json('Account has been deleted');
			} catch (err) {
				return res.status(500).json(err);
			}
		} else {
			return res
				.status(403)
				.json('You can update only your account!');
		}
	}
	async find(req, res) {
		try {
			const user = await User.findOne({
				_id: req.params.id,
			});
			res.status(200).json(user);
			console.log({ user });
		} catch (err) {
			return res.status(500).json(err);
		}
	}
	async findAll(req, res) {
		try {
			const users = await User.find({});
			res.status(200).json(users);
			console.log({ users });
		} catch (err) {
			return res.status(500).json(err);
		}
	}
}

module.exports = new UserController();
