import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { StaffEntity } from "./staff";


@Entity({ name: "task" })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    @IsString()
    task: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    importance: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    dispatch_time: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    deadline: string

    @Column({ type: "varchar", length: 100,default:"sent"})
    @IsString()
    status: string

    @ManyToOne(() => StaffEntity, (staff) => staff.task)
    staff: StaffEntity

    @ManyToOne(() => StaffEntity, (staff) => staff.task)
    manager: StaffEntity

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

}