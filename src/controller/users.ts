import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { UsersEntity } from '../entities/users';
import { catchError } from '../utils/rout-catch-error';

class UsersController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(
      await AppDataSource.getRepository(UsersEntity).find({
        relations: {
          orders: true,
        },
      })
    );
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    res.json(
      await AppDataSource.getRepository(UsersEntity).find({
        where: { id: +id },
        relations: {
          orders: true,
        },
      })
    );
  }

  public async Post(req: Request, res: Response) {
    await catchError(res, async () => {
      const users = await AppDataSource.getRepository(UsersEntity)
        .createQueryBuilder()
        .insert()
        .into(UsersEntity)
        .values(req.body)
        .returning('*')
        .execute();

      return {
        status: 201,
        message: 'users created',
        data: users.raw[0],
      };
    });
  }

  public async Put(req: Request, res: Response) {
    try {
      const { name, surname, father_name, birthday, phone, seriya, number, adress, dateof, email, orders } = req.body;
      const { id } = req.params;

      const users = await AppDataSource.getRepository(UsersEntity)
        .createQueryBuilder()
        .update(UsersEntity)
        .set({
          name,
          surname,
          father_name,
          birthday,
          phone,
          seriya,
          number,
          adress,
          dateof,
          email,
          orders,
        })
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'users updated',
        data: users.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async Delete(req: Request, res: Response) {
    await catchError(res, async () => {
      const { id } = req.params;

      const users = await AppDataSource.getRepository(UsersEntity)
        .createQueryBuilder()
        .delete()
        .from(UsersEntity)
        .where({ id })
        .returning('*')
        .execute();

      return {
        status: 200,
        message: 'users deleted',
        data: users.raw[0],
      };
    });
  }
}

export default new UsersController();
