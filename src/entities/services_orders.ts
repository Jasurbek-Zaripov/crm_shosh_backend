import { IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany} from "typeorm";
import { OrdersEntity } from "./orders";
import { ProductsEntity } from "./products";
import { ServicesEntity } from "./services";
import { OldOrdersEntity } from "./old_order";


@Entity({ name: "services_orders" })
export class ServicesOrdersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    price: string

    @Column({ type: "int" ,nullable:true})
    @IsNumber()
    count: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_payment: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    status_payment: string

    @Column({ type: "text",nullable:true})
    @IsString()
    comentary: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>OrdersEntity,(orders)=>orders.services_orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    orders:OrdersEntity

    @ManyToOne(()=>OldOrdersEntity,(old)=>old.services_orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    old:OldOrdersEntity

    @ManyToOne(()=>ProductsEntity,(products)=>products.services_orders,{nullable:true,onDelete:"CASCADE",onUpdate:"CASCADE"})
    products:ProductsEntity

    @ManyToOne(()=>ServicesEntity,(services)=>services.services_orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    services:ServicesEntity
}