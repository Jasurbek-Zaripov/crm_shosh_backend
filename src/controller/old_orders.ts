import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { OldOrdersEntity } from '../entities/old_order';

class OldOrdersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(OldOrdersEntity).find({
            relations: [
                "orders"
            ],order:{id:"ASC"}
        })); 
    }


    public async Post(req: Request, res: Response) {
        const { rooms,users, number_night, phone,sale, definition, arrival_date, departure_date, count_users,company,total_payable,company_details,booking,paid,debt,early_release,refund,country,comentary, orders } = req.body

        const oldorders = await AppDataSource.getRepository(OldOrdersEntity).createQueryBuilder().insert().into(OldOrdersEntity).values({rooms,users, number_night, phone,sale, definition, arrival_date, departure_date, count_users,company,total_payable,company_details,booking,paid,debt,early_release,refund,country,comentary, orders }).returning("*").execute()

        res.json({
            status: 201,
            message: "oldorders created",
            data: oldorders.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { rooms,users, number_night, phone,sale, definition, arrival_date, departure_date, count_users,company,total_payable,company_details,booking,paid,debt,early_release,refund,country,comentary, orders} = req.body
            const { id } = req.params

            const oldorders = await AppDataSource.getRepository(OldOrdersEntity).createQueryBuilder().update(OldOrdersEntity)
                .set({ rooms,users, number_night, phone,sale, definition, arrival_date, departure_date, count_users,company,total_payable,company_details,booking,paid,debt,early_release,refund,country,comentary, orders})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "oldorders updated",
                data: oldorders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const oldorders = await AppDataSource.getRepository(OldOrdersEntity).createQueryBuilder().delete().from(OldOrdersEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "oldorders deleted",
                data: oldorders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new OldOrdersController();
