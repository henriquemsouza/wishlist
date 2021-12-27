import { HeaderConvert } from '../types';
import { IHttpRequest, RequestRouter } from '../contracts';
import { Request, Response } from 'express';
import HttpResponse from '../responses/HttpResponse';

export default class ExpressRouterAdapter {
 
  static adapt(router: RequestRouter, headerConvertion?: HeaderConvert, deprecationWarning?: string, fn?: <T>(resp: T) => any) {
    return async (req: Request, resp: Response) => {
      const normalizedHeaders: { [k: string]: string } = ExpressRouterAdapter.NormalizeHeaders(req);
      const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.apiGateway.event.pathParameters,
        query: req.apiGateway.event.queryStringParameters,
        headers: normalizedHeaders,
      };


      const detailedResponse = req?.apiGateway?.event?.headers?.detailedResponse ? true : false;
      const httpResponse = await router.route(httpRequest);

      ExpressRouterAdapter.AdjustHeadersAndDeprecation(deprecationWarning, httpResponse, resp);
      if (fn) {
        httpResponse.body = fn(httpResponse.body);
      }
      return resp.status(httpResponse.statusCode).json(detailedResponse ? httpResponse : httpResponse.body);
    };
  }

  private static NormalizeHeaders(req: Request): { [k: string]: string } {
    return Object.keys(req.apiGateway.event.headers).reduce((destination, key) => {
      destination[key.toLowerCase()] = req.apiGateway.event.headers[key];
      return destination;
    }, {});
  }


  private static AdjustHeadersAndDeprecation(
    deprecationWarning: string,
    httpResponse: HttpResponse<any>,
    resp: Response<any, Record<string, any>>,
  ) {

    resp.status(httpResponse.statusCode).set({
      ...httpResponse.headers,
    });
    Reflect.deleteProperty(httpResponse, 'headers');
    if (deprecationWarning) {
      httpResponse.deprecated = deprecationWarning;
    }
  }
}
