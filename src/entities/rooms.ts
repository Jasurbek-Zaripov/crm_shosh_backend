import { IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany } from "typeorm";
import { FilialEntity } from "./filials";
import { OrdersEntity } from "./orders";
import { ChangeEntity } from "./change";


@Entity({ name: "rooms" })
export class RoomsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    rooms: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type: string

    @Column({ type: "varchar", length: 100, nullable:true })
    @IsString()
    definition: string

    @Column({ type: "int" })
    @IsNumber()
    count: number

    @Column({ type: "varchar", length: 100,default:"empty"})
    @IsString()
    status: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>FilialEntity,(filial)=>filial.rooms)
    filial:FilialEntity

    @OneToMany(() => OrdersEntity, (orders) => orders.rooms)
    orders: OrdersEntity[]

    @OneToMany(() => ChangeEntity, (change) => change.rooms)
    change: ChangeEntity[]
}