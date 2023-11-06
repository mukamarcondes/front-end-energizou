import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsString, IsPhoneNumber } from "class-validator";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razaoSocial: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column()
  @IsPhoneNumber()
  telefone: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt: Date;
}
