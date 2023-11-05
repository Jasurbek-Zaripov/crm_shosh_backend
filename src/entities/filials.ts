import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, OneToMany } from "typeorm";
import { ConsumptionCategoryEntity } from "./consumption_category";
import { LidsEntity } from "./lids";
import { OrdersEntity } from "./orders";
import { RoomsEntity } from "./rooms";
import { ServicesEntity } from "./services";
import { StaffEntity } from "./staff";
import { ProductsEntity } from "./products";


@Entity({ name: "filials" })
export class FilialEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    filial_name: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(() => StaffEntity, (staff) => staff.filial)
    staff: StaffEntity[]

    @OneToMany(()=>RoomsEntity,(rooms)=>rooms.filial)
    rooms:RoomsEntity[]

    @OneToMany(()=>LidsEntity,(lids)=>lids.filial)
    lids:LidsEntity[]

    @OneToMany(()=>OrdersEntity,(orders)=>orders.filial)
    orders:OrdersEntity[]

    @OneToMany(()=>ConsumptionCategoryEntity,(consumption_category)=>consumption_category.filial)
    consumption_category:ConsumptionCategoryEntity[]

    @OneToMany(()=>ServicesEntity,(services)=>services.filial)
    services:ServicesEntity[]

    @OneToMany(()=>ProductsEntity,(products)=>products.filial)
    products:ProductsEntity[]
}