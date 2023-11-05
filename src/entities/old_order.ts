import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { OrdersEntity } from "./orders";
import { ServicesOrdersEntity } from "./services_orders";



@Entity({ name: "old_oders" }) 
export class OldOrdersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    @IsString()
    users: string

    @Column({type:"varchar"})
    @IsString()
    rooms:string 

    @Column({ type: "varchar", length: 200 })
    @IsString()
    number_night: string

    @Column({ type: "varchar", length: 200,nullable:true })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100,nullable:true,default:0 })
    @IsString()
    sale: string

    @Column({ type: "varchar", length: 100,nullable:true,default:0 })
    @IsString()
    definition: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    arrival_date: string
    
    @Column({ type: "varchar", length: 100 })
    @IsString()
    departure_date: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    count_users: string

    @Column({ type: "varchar", length: 200,nullable:true })
    @IsString()
    company: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    total_payable: string

    @Column({ type: "varchar", length: 500,nullable:true })
    @IsString()
    company_details: string

    @Column({ type: "varchar", length: 200,default:0})
    @IsString()
    booking: string

    @Column({ type: "varchar", length: 200, default:0 })
    @IsString()
    paid: string

    @Column({ type: "varchar", length: 200, default:0 })
    @IsString()
    debt: string

    @Column({ type: "varchar",})
    @IsString()
    early_release:string

    @Column({ type: "varchar",})
    @IsString() 
    refund:string

    @Column({ type: "text",nullable:true })
    @IsString()
    country: string

    @Column({ type: "text",nullable:true })
    @IsString()
    comentary: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => OrdersEntity, (orders) => orders.old,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    orders: OrdersEntity

    @OneToMany(() => ServicesOrdersEntity, (services_orders) => services_orders.old,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    services_orders: ServicesOrdersEntity[]

}