import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ConsumptionEntity } from '../entities/consumption';

class ConsumptionController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations: {
                consumption_category: true,
                staff:true,
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations: {
                consumption_category: true,
                staff:true,
            }, where: { id: +id }
        }));
    }

    public async GetAdmin(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations:{
                staff:true,
                consumption_category: true
            },order:{id:"ASC"},
            where: { status: "admin_view" }
        }));
    }

    public async GetManager(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations:{
                staff:true,
                consumption_category: true
            },order:{id:"ASC"},
            where: { status: "manager_view" }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { cash_flow, transfer_exp, comentary,staff, consumption_category } = req.body

        const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().insert().into(ConsumptionEntity).values({ cash_flow, transfer_exp, comentary,staff, consumption_category}).returning("*").execute()

        res.json({
            status: 201,
            message: "Consumption created",
            data: consumption.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { cash_flow, transfer_exp, comentary,staff, consumption_category } = req.body
            const {id}=req.params

            const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().update(ConsumptionEntity)
            .set({cash_flow, transfer_exp, comentary,staff, consumption_category})
            .where({ id })
            .returning("*")
            .execute()

            res.json({
                status: 200,
                message: "Consumption updated",
                data: consumption.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().update(ConsumptionEntity)
                .set({ status: "manager_view" })
                .where({status:"admin_view"}).andWhere({staff:id})
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "consumption deleted",
                data: consumption.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ConsumptionController();