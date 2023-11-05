import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ServicesOrdersEntity } from '../entities/services_orders';

class ServicesOrdersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ServicesOrdersEntity).find({
            relations: {
                products: true,
                orders:true
            },order:{id:"ASC"}
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ServicesOrdersEntity).find({
            relations: {
                products: true,
                orders:true
            }, where: { id: +id },order:{id:"ASC"}
        }));
    }

    public async Post(req: Request, res: Response) {
        const {price,count,type_payment,status_payment,comentary,orders,products,services } = req.body
        const services_orders = await AppDataSource.getRepository(ServicesOrdersEntity).createQueryBuilder().insert().into(ServicesOrdersEntity).values({ price,count,type_payment,status_payment,comentary,orders,products,services }).returning("*").execute()

        res.json({
            status: 201,
            message: "services_orders created",
            data: services_orders.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { price,count,type_payment,status_payment,comentary,orders,products,services } = req.body
            const { id } = req.params

            const services_orders = await AppDataSource.getRepository(ServicesOrdersEntity).createQueryBuilder().update(ServicesOrdersEntity)
                .set({ price,count,type_payment,status_payment,comentary,orders,products,services })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "services_orders updated",
                data: services_orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const services_orders= await AppDataSource.getRepository(ServicesOrdersEntity).createQueryBuilder().delete().from(ServicesOrdersEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "services_orders deleted",
                data: services_orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ServicesOrdersController();