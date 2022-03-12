const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const auth = require('./middleware/auth');
var cors = require('cors');
const app = express();
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, (req, res) => {
	console.log('connect to mongodb success!');
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.post('/welcome', auth, (req, res) => {
	res.status(200).send('Welcome 🙌 ');
});
app.use('/api/users', auth, userRoute);
app.use('/api/auth', authRoute);

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.listen(3000);
