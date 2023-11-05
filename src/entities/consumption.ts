import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from "typeorm";
import { ConsumptionCategoryEntity } from "./consumption_category";
import { StaffEntity } from "./staff";

@Entity({ name: "consumption" })
export class ConsumptionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar",nullable:true })
    @IsString()
    cash_flow: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    transfer_exp: string

    @Column({ type: "varchar", nullable:true})
    @IsString()
    comentary: string
 
    @Column({ type: "varchar", length: 100,default:"admin_view"})
    @IsString()
    status: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => StaffEntity, (staff) => staff.consumption,{nullable:true})
    staff: StaffEntity

    @ManyToOne(() => ConsumptionCategoryEntity, (consumption_category) => consumption_category.consumption)
    consumption_category: ConsumptionCategoryEntity
}
