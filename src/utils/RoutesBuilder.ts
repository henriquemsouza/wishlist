import { GetFromContainer } from '../infra/container/inversify.config';
import { HeaderConvert, Newable } from '../shared/types';
import { Router } from 'express';
import ExpressRouterAdapter from '../shared/adapters/ExpressRouterAdapter';


export const GenerateRoute = (obj: Newable, headerConvertion?: HeaderConvert) =>
  ExpressRouterAdapter.adapt(GetFromContainer(obj), headerConvertion);


export class RoutesBuilder {
  private _router = Router();

  get(url: string | string[], requestRouter: Newable, headerConvertion?: HeaderConvert, deprecationWarn?: string, fn?: <T>(resp: T) => any) {
    this._router.get(url, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter), headerConvertion, deprecationWarn, fn));
    return this;
  }
  post(url: string | string[], requestRouter: Newable, headerConvertion?: HeaderConvert, deprecationWarn?: string, fn?: <T>(resp: T) => any) {
    this._router.post(url, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter), headerConvertion, deprecationWarn, fn));
    return this;
  }
  put(url: string | string[], requestRouter: Newable, headerConvertion?: HeaderConvert, deprecationWarn?: string, fn?: <T>(resp: T) => any) {
    this._router.put(url, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter), headerConvertion, deprecationWarn, fn));
    return this;
  }
  delete(url: string | string[], requestRouter: Newable, headerConvertion?: HeaderConvert, deprecationWarn?: string, fn?: <T>(resp: T) => any) {
    this._router.delete(url, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter), headerConvertion, deprecationWarn, fn));
    return this;
  }
  patch(url: string | string[], requestRouter: Newable, headerConvertion?: HeaderConvert, deprecationWarn?: string, fn?: <T>(resp: T) => any) {
    this._router.patch(url, ExpressRouterAdapter.adapt(GetFromContainer(requestRouter), headerConvertion, deprecationWarn, fn));
    return this;
  }
  build() {
    return this._router;
  }
}
