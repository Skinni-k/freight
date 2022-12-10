import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Employee } from "./Employee";
import { Shipment } from "./Shipment";
import { Truck } from "./Truck";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Truck)
  truck: Truck;

  @ManyToOne(() => Employee)
  employee: Employee;

  @ManyToOne(() => Shipment)
  shipment: Shipment;

  @Column({ type: "varchar", length: 100 })
  origin: string;

  @Column({ type: "varchar", length: 100 })
  destination: string;
}
