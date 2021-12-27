import { ContainerModule } from 'inversify';
import SampleCase from './Sample/useCases/SampleCase';
import SampleRouter from './Sample/SampleRouter';

const RandomSampleContainer = new ContainerModule(bind => {
  bind<SampleCase>(SampleCase).toSelf();
  bind<SampleRouter>(SampleRouter).toSelf();
  
});

export default RandomSampleContainer;
