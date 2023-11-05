import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm";
import { FilialEntity } from "./filials";
import { ProductsEntity } from "./products";
import { ServicesOrdersEntity } from "./services_orders";


@Entity({ name: "services" })
export class ServicesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    services_name: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => FilialEntity, (filial) => filial.services)
    filial: FilialEntity

    @OneToMany(()=>ProductsEntity,(products)=>products.services,{nullable:true})
    products:ProductsEntity[]

    @OneToMany(() => ServicesOrdersEntity, (services_orders) => services_orders.services)
    services_orders: ServicesOrdersEntity[]

}