import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee";
import { Truck } from "./Truck";

@Entity()
export class Repair {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Truck)
  truck: Truck;

  @ManyToOne(() => Employee)
  mechanic: Employee;

  @Column("int")
  estimated_days: number;
}
