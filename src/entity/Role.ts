import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Brand } from "./Brand";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => Brand)
  @JoinColumn()
  brand: Brand;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  category: string;
}
