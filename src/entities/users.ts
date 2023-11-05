import { IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrdersEntity } from './orders';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  surname: string;

  @Column({ type: 'varchar', length: 200 })
  @IsString()
  father_name: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  birthday: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  phone: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  seriya: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  number: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  adress: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  dateof: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  @IsString()
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => OrdersEntity, orders => orders.users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  orders: OrdersEntity;
}
