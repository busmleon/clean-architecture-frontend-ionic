import { Entity } from './entity';

export abstract class UseCase<P extends Entity | void, R extends Entity | void> {
  abstract execute(param: P): Promise<R | Error>;
}