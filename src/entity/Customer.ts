import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Shipment } from "./Shipment";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Shipment, (shipment) => shipment.customer)
  shipment: Shipment[];

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  address: string;

  @Column("bigint")
  mobile: number;

  @Column("bigint")
  phone: number;
}
