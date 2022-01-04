import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
//AfterInsert is a decorator that is used to execute a function after an entity is inserted.

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  //Ces Fonctions permettent de ce qui ce passe sur cet entite lorsqu'on l'insert, update ou remove

  @AfterInsert()
  logInsert() {
    console.log(`User ${this.name} with id ${this.id} has been inserted`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id ${this.id} has been updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with id ${this.id} has been removed`);
  }
}
