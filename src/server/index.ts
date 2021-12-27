import * as cors from 'cors';
import * as express from 'express';
import { eventContext } from 'aws-serverless-express/middleware';
import ExpressRouteNotFoundAdapter from '../shared/adapters/ExpressRouteNotFoundAdapter';
import Routes from '../modules/Routes';


const server = express();

server.use(cors());

server.use(eventContext());
server.use(express.json({ limit: '50mb' }));

server.use('/v1', Routes);

server.use(ExpressRouteNotFoundAdapter.adapt());

export default server;
