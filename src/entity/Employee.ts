import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  surname: string;

  @Column({ type: "varchar", length: 100 })
  seniority: string;
}
