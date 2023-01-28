import { PrimaryGeneratedColumn } from 'typeorm';

export class ConvocatoriaStateTypeorm {
  @PrimaryGeneratedColumn({ type: 'int', name: 'state'})
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ConvocatoriaStateTypeorm  {
    return new ConvocatoriaStateTypeorm(value);
  }
}