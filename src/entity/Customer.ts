import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { Company } from "./Company";
import * as bcrypt from "bcrypt";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ManyToMany((_type) => Company)
  @JoinTable()
  companys: Company[];

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt: Date;

  async setPassword(password: string) {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    this.password = hash;
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
