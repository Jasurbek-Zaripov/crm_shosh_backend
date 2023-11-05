import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ServicesEntity } from '../entities/services';

class ServicesController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ServicesEntity).find({
            relations: {
                filial: true
            },order:{id:"ASC"}
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ServicesEntity).find({
            relations: {
                filial: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const {services_name, filial } = req.body

        const services = await AppDataSource.getRepository(ServicesEntity).createQueryBuilder().insert().into(ServicesEntity).values({ services_name,filial }).returning("*").execute()

        res.json({
            status: 201,
            message: "services created",
            data: services.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { services_name, filial } = req.body
            const { id } = req.params

            const services = await AppDataSource.getRepository(ServicesEntity).createQueryBuilder().update(ServicesEntity)
                .set({ services_name, filial })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "services updated",
                data: services.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const services = await AppDataSource.getRepository(ServicesEntity).createQueryBuilder().delete().from(ServicesEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "services deleted",
                data: services.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ServicesController();