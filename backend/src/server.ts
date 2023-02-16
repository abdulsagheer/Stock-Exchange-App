// Importing Libraries
import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// Importing dependencies
import dbConnect from './config/connectionDB';
import Logging from './utils/logging';
import { config } from './config/config';
import Api, { Message } from './utils/helper';
import userRoute from './routes/user.route';
import stockRoute from './routes/stock.route';
import orderRoute from './routes/order.route';
import { initialiseCron } from './services/cron-jobs/cron';

dotenv.config();
/** DB configuration */
dbConnect();

/** Using Express Server */
const app: Application = express();

/** Cron Job */
// initialiseCron();

var whitelist = ['http://https:localhost:3000', 'http://https:localhost:5174'];
var corsOptionsDelegate = function (req: any, callback: any) {
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

/**  Only Start Server if Mongoose Connects */
const StartServer = () => {
	/** Log the request */
	app.use((req, res, next) => {
		/** Log the req */
		Logging.info(
			`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
		);

		res.on('finish', () => {
			/** Log the res */
			Logging.info(
				`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
			);
		});

		next();
	});

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	/** Rules of our API */
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		res.header('Content-Type', 'application/json');

		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, PATCH, DELETE, GET'
			);
			return res.status(200).json({});
		}

		next();
	});

	/** Health Check */
	app.get('/ping', (req, res, next) =>
		Api.ok(res, { hello: 'hello word' }, Message.Found)
	);

	/**  Routes */
	app.use('/api/users', userRoute);
	app.use('/api/stocks', stockRoute);
	app.use('/api/orders', orderRoute);

	/** Error handling */
	app.use((req, res, next) => {
		const error = new Error('Not found');

		Logging.error(error);
		Api.notFound(req, res, Message.NotFound);
	});

	http
		.createServer(app)
		.listen(config.server.port, () =>
			Logging.info(`Server is running on port ${config.server.port}`)
		);
};

StartServer();
