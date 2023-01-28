import { PrimaryGeneratedColumn } from 'typeorm';

export class ConvocatoriaUpdatedByTypeorm {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'updated_by' })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ConvocatoriaUpdatedByTypeorm  {
    return new ConvocatoriaUpdatedByTypeorm(value);
  }
}