import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FilialEntity } from '../entities/filials';

class FilialController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(FilialEntity).find({
            relations: {
                staff: true,
                rooms: true,
                lids:true,
                orders:true,
                consumption_category:true,
                products:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(FilialEntity).find({
            where: { id: +id },
            relations: {
                staff: true,
                rooms: true,
                lids:true,
                orders:true,
                consumption_category:true,
                products:true
            }
        }));
    }

    public async Post(req: Request, res: Response) {
        try {
            const { filial_name } = req.body

            const filial = await AppDataSource.getRepository(FilialEntity).createQueryBuilder().insert().into(FilialEntity).values({ filial_name }).returning(["id", "filial_name"]).execute()

            res.json({
                status: 201,
                message: "Filial created",
                data: filial.raw[0]
            })
        } catch (error) {
            console.log(error);
        }

    }

    public async Put(req: Request, res: Response) {
        try {
            const { filial_name } = req.body
            const { id } = req.params

            const filial = await AppDataSource.getRepository(FilialEntity).createQueryBuilder().update(FilialEntity)
                .set({ filial_name })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "Filial updated",
                data: filial.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const filial = await AppDataSource.getRepository(FilialEntity).createQueryBuilder().delete().from(FilialEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "Filial deleted",
                data: filial.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new FilialController();