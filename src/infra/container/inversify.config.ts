import { Container } from 'inversify';

import RandomSampleContainer from '../../modules/RandomSample/RandomSampleContainer';
import { Newable } from '../../shared/types';


const container = new Container({ defaultScope: 'Singleton' });

container.load(RandomSampleContainer);

export default container;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);
