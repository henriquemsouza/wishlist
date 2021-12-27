import { inject, injectable } from 'inversify';
import { RequestRouter } from '../../../shared/contracts';
import SampleCase from './useCases/SampleCase';

@injectable()
export default class SampleRouter implements RequestRouter {
  @inject(SampleCase) private case: SampleCase;

  async route() {
    const result = await this.case.execute();
    return result;
  }
}
