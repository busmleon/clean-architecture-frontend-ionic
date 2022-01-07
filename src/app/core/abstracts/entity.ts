export abstract class Entity {
  readonly id: string;

  constructor(obj: Entity) {
    Object.assign(this, obj);
  }
}
