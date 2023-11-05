import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { FilialEntity } from "./filials";


@Entity({ name: "lids" })
export class LidsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    name: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    arrival_date: string
    
    @Column({ type: "varchar", length: 100 })
    @IsString()
    departure_date: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_rooms: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    count_rooms: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    seriya: string

    @Column({ type: "varchar", length: 100,default:"new" })
    @IsString()
    status: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>FilialEntity,(filial)=>filial.lids)
    filial:FilialEntity
}