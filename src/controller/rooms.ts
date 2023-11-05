import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { RoomsEntity } from '../entities/rooms';
import { catchError } from './../utils/rout-catch-error';

class RoomsController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(
      await AppDataSource.getRepository(RoomsEntity).find({
        relations: ['orders', 'orders.users', 'filial'],
        order: { id: 'ASC' },
      })
    );
  }

  public async GetEmpty(req: Request, res: Response): Promise<void> {
    await catchError(res, async () => {
      const data = await AppDataSource.getRepository(RoomsEntity).find({
        relations: ['orders', 'orders.users', 'filial'],
        where: { status: 'empty' },
        order: { id: 'ASC' },
      });

      return {
        status: 200,
        message: 'ok',
        data,
      };
    });
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    await catchError(res, async () => {
      const { id } = req.params;

      const data = await AppDataSource.getRepository(RoomsEntity).find({
        relations: ['orders', 'orders.users', 'filial'],
        where: { id: +id },
      });

      return {
        status: 200,
        message: 'ok',
        data,
      };
    });
  }

  public async Post(req: Request, res: Response) {
    const { rooms, count, type, definition, status, filial } = req.body;

    const room = await AppDataSource.getRepository(RoomsEntity)
      .createQueryBuilder()
      .insert()
      .into(RoomsEntity)
      .values({ rooms, count, type, definition, status, filial })
      .returning('*')
      .execute();

    res.json({
      status: 201,
      message: 'rooms created',
      data: room.raw[0],
    });
  }

  public async Put(req: Request, res: Response) {
    await catchError(res, async () => {
      const { rooms, type, count, status, filial } = req.body;
      const { id } = req.params;

      const room = await AppDataSource.getRepository(RoomsEntity)
        .createQueryBuilder()
        .update(RoomsEntity)
        .set({ rooms, type, count, status, filial })
        .where({ id })
        .returning('*')
        .execute();

      return {
        status: 200,
        message: 'Rooms updated',
        data: room.raw[0],
      };
    });
  }

  public async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const room = await AppDataSource.getRepository(RoomsEntity)
        .createQueryBuilder()
        .delete()
        .from(RoomsEntity)
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'rooms deleted',
        data: room.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RoomsController();
