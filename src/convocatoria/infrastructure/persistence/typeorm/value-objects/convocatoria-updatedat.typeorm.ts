import { Column } from 'typeorm';

export class ConvocatoriaUpdatedAtTypeORM {
  @Column('varchar', { name: 'updated_at', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): ConvocatoriaUpdatedAtTypeORM {
    return new ConvocatoriaUpdatedAtTypeORM(name);
  }
}