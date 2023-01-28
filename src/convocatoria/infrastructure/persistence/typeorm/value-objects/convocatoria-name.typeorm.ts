import { Column } from 'typeorm';

export class ConvocatoriaNameTypeORM {
  @Column('varchar', { name: 'convocatoriaName', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): ConvocatoriaNameTypeORM {
    return new ConvocatoriaNameTypeORM(name);
  }
}