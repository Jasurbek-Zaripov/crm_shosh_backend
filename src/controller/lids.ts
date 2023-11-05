import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { LidsEntity } from '../entities/lids';

class LidsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(LidsEntity).find({
            relations:{
                filial:true
            },order:{id:"ASC"}
        }));
    }

    public async GetNew(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(LidsEntity).find({
            relations:{
                filial:true
            },where:{status:"new"},order:{id:"ASC"}}));
    }

    public async GetActive(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(LidsEntity).find({
            relations:{
                filial:true
            },where:{status:"accepted"},order:{id:"ASC"}}));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(LidsEntity).find({
            where: { id: +id },
            relations:{
                filial:true
            }
        }));
    }

    public async Post(req: Request, res: Response) {
        const {name,phone,arrival_date,departure_date,type_rooms,count_rooms,seriya,filial } = req.body

        const lids = await AppDataSource.getRepository(LidsEntity).createQueryBuilder().insert().into(LidsEntity).values({name,phone,arrival_date,departure_date,type_rooms,count_rooms,seriya,filial}).returning("*").execute()

        res.json({
            status: 201,
            message: "lids created",
            data: lids.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name,phone,arrival_date,departure_date,type_rooms,count_rooms,seriya,status,filial } = req.body
            const { id } = req.params

            const lids = await AppDataSource.getRepository(LidsEntity).createQueryBuilder().update(LidsEntity)
                .set({name,phone,arrival_date,departure_date,type_rooms,count_rooms,seriya,status,filial})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "lids updated",
                data: lids.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const lids = await AppDataSource.getRepository(LidsEntity).createQueryBuilder().update(LidsEntity)
                .set({status:"canceled"})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "lids deleted",
                data: lids.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new LidsController();