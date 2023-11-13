import "reflect-metadata";
import { DataSource } from "typeorm";
import { ConsumptionEntity } from "./entities/consumption";
import { ConsumptionCategoryEntity } from "./entities/consumption_category";
import { FilialEntity } from "./entities/filials";
import { LidsEntity } from "./entities/lids";
import { OrdersEntity } from "./entities/orders";
import { ProductsEntity } from "./entities/products";
import { RoomsEntity } from "./entities/rooms";
import { ServicesEntity } from "./entities/services";
import { ServicesOrdersEntity } from "./entities/services_orders";
import { StaffEntity } from "./entities/staff";
import { TaskEntity } from "./entities/task";
import { UsersEntity } from "./entities/users";
import { ChangeEntity } from "./entities/change";
import { OldOrdersEntity } from "./entities/old_order";

export const AppDataSource = new DataSource({
  type: "postgres",
  // url: "postgres://postgres:123@localhost:5432/shosh_b",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "7hEfwjl*OVRL",
  database: "shosh_crm_test",
  synchronize: true,
  logging: false,
  entities: [
    FilialEntity,
    StaffEntity,
    RoomsEntity,
    UsersEntity,
    LidsEntity,
    ConsumptionCategoryEntity,
    ConsumptionEntity,
    OrdersEntity,
    ServicesEntity,
    ProductsEntity,
    ServicesOrdersEntity,
    TaskEntity,
    ChangeEntity,
    OldOrdersEntity,
  ],
  migrations: [],
  subscribers: [],
});
