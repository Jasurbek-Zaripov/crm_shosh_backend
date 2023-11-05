import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ConsumptionCategoryEntity } from '../entities/consumption_category';

class ConsumptionCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ConsumptionCategoryEntity).find({
            relations: {
                consumption: true,
                filial:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(ConsumptionCategoryEntity).find({
            relations: {
                consumption: true,
                filial:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        try {
            const { consumption_name,filial } = req.body

            const consumption_category = await AppDataSource.getRepository(ConsumptionCategoryEntity).createQueryBuilder().insert().into(ConsumptionCategoryEntity).values({ consumption_name,filial }).returning("*").execute()

            res.json({
                status: 201,
                message: "ConsumptionCategory created",
                data: consumption_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { consumption_name,filial } = req.body
            const { id } = req.params

            const consumption_category = await AppDataSource.getRepository(ConsumptionCategoryEntity).createQueryBuilder().update(ConsumptionCategoryEntity)
                .set({ consumption_name,filial })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "ConsumptionCategory updated",
                data: consumption_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const consumption_category = await AppDataSource.getRepository(ConsumptionCategoryEntity).createQueryBuilder().delete().from(ConsumptionCategoryEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "ConsumptionCategory deleted",
                data: consumption_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ConsumptionCategoryController();