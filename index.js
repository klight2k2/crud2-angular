require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const auth = require('./middleware/auth');
const app = express();

const ports = process.env.PORT || 3000;

app.use(morgan('common'));
mongoose
	.connect(
		'mongodb+srv://myapp:hello123@cluster0.mideg.mongodb.net/test?authSource=admin&replicaSet=atlas-3kr2am-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		app.listen(
			ports,
			console.log(`Server is running on port ${ports}`)
		);
	})
	.catch(err =>
		console.log(`Could not connect to database server`, err)
	);

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join('images')));

app.use('/api/users', auth, userRoute);
app.use('/api/auth', authRoute);
