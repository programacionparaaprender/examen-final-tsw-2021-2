import { Column } from 'typeorm';

export class CalificacionTypeORM {
  @Column('int', { name: 'calificacion', nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): CalificacionTypeORM {
    return new CalificacionTypeORM(name);
  }
}