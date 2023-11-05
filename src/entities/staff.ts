import { IsString,IsEmail, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { FilialEntity } from "./filials";
import { OrdersEntity } from "./orders";
import { TaskEntity } from "./task";
import { ChangeEntity } from "./change";
import { ConsumptionEntity } from "./consumption";


@Entity({ name: "staff" })
export class StaffEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    staff_name: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    staff_surname: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    birthday: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    phone: string

    @Column({ type: "text" })
    @IsString()
    image: string

    @Column({ type: "text" }) 
    @IsString()
    passport: string

    @Column({ type: "varchar"})
    @Length(1, 250)
    @IsEmail()
    email: string

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar" })
    salary: string;

    @Column({ type: "varchar" })
    role: string; 
 
    @Column({ type: "int",default:0 })
    number_app: number; 

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => FilialEntity, (filial) => filial.staff)
    filial: FilialEntity

    @OneToMany(() => OrdersEntity, (orders) => orders.staff)
    orders: OrdersEntity[]

    @OneToMany(() => TaskEntity, (task) => task.staff)
    task: TaskEntity[]

    @OneToMany(() => ChangeEntity, (change) => change.staff)
    change: ChangeEntity[]

    @OneToMany(() => ConsumptionEntity, (consumption) => consumption.staff)
    consumption: ConsumptionEntity[]
}