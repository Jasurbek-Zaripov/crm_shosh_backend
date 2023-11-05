import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { OrdersEntity } from '../entities/orders';
import { catchError } from '../utils/rout-catch-error';

class OrdersController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(
      await AppDataSource.getRepository(OrdersEntity).find({
        relations: [
          'services_orders',
          'services_orders.products',
          'services_orders.services',
          'users',
          'rooms',
          'staff',
          'filial',
          'old',
        ],
        order: { id: 'ASC' },
      })
    );
  }

  public async GetBusy(req: Request, res: Response): Promise<void> {
    res.json(
      await AppDataSource.getRepository(OrdersEntity).find({
        relations: [
          'services_orders',
          'services_orders.products',
          'services_orders.services',
          'users',
          'rooms',
          'staff',
          'filial',
          'old',
        ],
        order: { id: 'ASC' },
        where: { status: 'busy' },
      })
    );
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    await catchError(res, async () => {
      const { id } = req.params;
      const data = await AppDataSource.getRepository(OrdersEntity).find({
        where: { id: +id },
        relations: [
          'services_orders',
          'services_orders.products',
          'services_orders.services',
          'users',
          'rooms',
          'staff',
          'filial',
          'old',
        ],
      });

      return {
        status: 200,
        message: 'ok',
        data,
      };
    });
  }

  public async UsersOnly(req: Request, res: Response): Promise<void> {
    await catchError(res, async () => {
      const { id } = req.params;
      const data = await AppDataSource.getRepository(OrdersEntity).find({
        where: { id: +id },
        relations: ['users'],
      });

      return {
        status: 200,
        message: 'ok',
        data,
      };
    });
  }

  public async Post(req: Request, res: Response) {
    await catchError(res, async () => {
      const orders = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .insert()
        .into(OrdersEntity)
        .values(req.body)
        .returning('*')
        .execute();

      return {
        status: 201,
        message: 'orders created',
        data: orders.raw[0],
      };
    });
  }

  public async Put(req: Request, res: Response) {
    await catchError(res, async () => {
      const {
        rooms,
        number_night,
        type_payment,
        phone,
        arrival_date,
        departure_date,
        count_users,
        country,
        status_payment,
        company,
        definition,
        booking,
        paid,
        debt,
        total_payable,
        comentary,
        staff,
        filial,
        company_details,
        sale,
        status,
        color,
        status_client,
      } = req.body;
      const { id } = req.params;

      const orders = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .update(OrdersEntity)
        .set({
          rooms,
          number_night,
          type_payment,
          phone,
          arrival_date,
          departure_date,
          count_users,
          country,
          status_payment,
          company,
          definition,
          booking,
          paid,
          debt,
          total_payable,
          comentary,
          staff,
          filial,
          company_details,
          sale,
          status,
          color,
          status_client,
        })
        .where({ id })
        .returning('*')
        .execute();

      return {
        status: 200,
        message: 'orders updated',
        data: orders.raw[0],
      };
    });
  }

  public async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orders = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .update(OrdersEntity)
        .set({ status: 'empty' })
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'orders status update',
        data: orders.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async DeleteOrders(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orders = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .update(OrdersEntity)
        .set({ status: 'deleted' })
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'orders status update',
        data: orders.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async DeleteOrdersFull(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orders = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .delete()
        .from(OrdersEntity)
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'orderss deleted',
        data: orders.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new OrdersController();
