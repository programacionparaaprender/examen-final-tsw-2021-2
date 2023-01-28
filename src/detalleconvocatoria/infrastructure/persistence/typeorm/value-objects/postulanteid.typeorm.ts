import { Column } from 'typeorm';

export class PostulanteIdTypeORM {
  @Column('bigint', { name: 'postulante_id', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(name: number): PostulanteIdTypeORM {
    return new PostulanteIdTypeORM(name);
  }
}