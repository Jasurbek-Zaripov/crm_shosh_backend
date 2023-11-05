import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ChangeEntity } from '../entities/change';

class ChangeController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ChangeEntity).find({
            relations:{
                rooms:true,
                staff:true
            },order:{id:"ASC"}
        }));
    }

    public async GetAdmin(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ChangeEntity).find({
            relations:{
                rooms:true,
                staff:true
            },order:{id:"ASC"},
            where: { status: "admin_view" }
        }));
    }

    public async GetManager(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ChangeEntity).find({
            relations:{
                rooms:true,
                staff:true
            },order:{id:"ASC"},
            where: { status: "manager_view" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(ChangeEntity).find({
            where: { id: +id },
            relations:{
                rooms:true,
                staff:true
            },order:{id:"ASC"}
        }));
    }

    public async Post(req: Request, res: Response) {
        const { full_name,cash_coming,enum_coming,arrival_date,departure_date,staff,rooms,cash_flow,transfer_exp,comentary,consumption_category } = req.body

        const change = await AppDataSource.getRepository(ChangeEntity).createQueryBuilder().insert().into(ChangeEntity).values({full_name,cash_coming,enum_coming,arrival_date,departure_date,staff,rooms,cash_flow,transfer_exp,comentary,consumption_category}).returning("*").execute()

        res.json({
            status: 201,
            message: "change created",
            data: change.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { full_name,cash_coming,enum_coming,arrival_date,departure_date,staff,rooms,cash_flow,transfer_exp,comentary,consumption_category} = req.body
            const { id } = req.params

            const change = await AppDataSource.getRepository(ChangeEntity).createQueryBuilder().update(ChangeEntity)
                .set({full_name,cash_coming,enum_coming,arrival_date,departure_date,staff,rooms,cash_flow,transfer_exp,comentary,consumption_category})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "change updated",
                data: change.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const change = await AppDataSource.getRepository(ChangeEntity).createQueryBuilder().update(ChangeEntity)
                .set({ status: "manager_view" })
                .where({status:"admin_view"}).andWhere({staff:id})
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "change deleted",
                data: change.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ChangeController();
