const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package

router.post("/", async (req, res) => {
	try {
		// Validate the request body
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// Find user by email
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		// Validate the password
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		// Check if the user has verified their email
		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email has been sent to your account, please verify" });
		}

		// Generate JWT token
		const jwtToken = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });

		// Respond with the JWT token
		res.status(200).send({ data: jwtToken, message: "Logged in successfully" });
	} catch (error) {
		console.error("Error during authentication:", error); // Log the error for debugging
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Validation function for the request body
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
