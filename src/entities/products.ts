import { IsNumber, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany } from "typeorm";
import { ServicesEntity } from "./services";
import { ServicesOrdersEntity } from "./services_orders";
import { FilialEntity } from "./filials";


@Entity({ name: "products" })
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    product_name: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    price: string

    @Column({ type: "int" })
    @IsNumber()
    count: number

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>ServicesEntity,(services)=>services.products)
    services:ServicesEntity

    @ManyToOne(() => FilialEntity, (filial) => filial.products)
    filial: FilialEntity

    @OneToMany(() => ServicesOrdersEntity, (services_orders) => services_orders.products)
    services_orders: ServicesOrdersEntity[]
}