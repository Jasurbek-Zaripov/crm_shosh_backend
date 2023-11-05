import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { StaffEntity } from "./staff";
import { RoomsEntity } from "./rooms";


@Entity({ name: "change" })
export class ChangeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text",nullable:true})
    @IsString()
    full_name: string

    @Column({ type: "varchar",nullable:true})
    @IsString()
    cash_coming: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    enum_coming: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    arrival_date: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    departure_date: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    cash_flow: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    transfer_exp: string

    @Column({ type: "varchar", nullable:true})
    @IsString()
    comentary: string

    @Column({type:"varchar",nullable:true})
    @IsString()
    consumption_category:string
 
    @Column({ type: "varchar", length: 100,default:"admin_view"})
    @IsString()
    status: string

    @ManyToOne(() => StaffEntity, (staff) => staff.change)
    staff: StaffEntity

    @ManyToOne(() => RoomsEntity, (rooms) => rooms.change)
    rooms: RoomsEntity

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

}