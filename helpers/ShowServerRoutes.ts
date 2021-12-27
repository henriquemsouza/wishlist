import 'reflect-metadata';
import routeList from 'express-routes-catalogue';
import server from '../src/server';

routeList.terminal(server);
