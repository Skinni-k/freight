import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Entity()
export class Truck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand)
  brand: Brand;

  @Column("float")
  load: number;

  @Column("float")
  capacity: number;

  @Column("int")
  year: number;

  @Column("int")
  number_of_Repair: number;
}
