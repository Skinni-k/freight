import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column("float")
  weight: number;

  @Column("float")
  value: number;

  @Column({ type: "varchar", length: 100 })
  origin: string;

  @Column({ type: "varchar", length: 100 })
  destination: string;
}
