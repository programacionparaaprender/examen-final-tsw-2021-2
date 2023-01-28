import { Column } from 'typeorm';

export class ConvocatoriaIdTypeORM {
  @Column('bigint', { name: 'convocatoria_id', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(name: number): ConvocatoriaIdTypeORM {
    return new ConvocatoriaIdTypeORM(name);
  }
}