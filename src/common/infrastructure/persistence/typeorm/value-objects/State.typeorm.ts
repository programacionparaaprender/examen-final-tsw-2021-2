import { Column } from 'typeorm';

export class StateTypeorm {
  @Column('int', { name: 'state'})
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): StateTypeorm  {
    return new StateTypeorm(value);
  }
}