import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ProductsEntity } from '../entities/products';

class ProductsController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(
      await AppDataSource.getRepository(ProductsEntity).find({
        relations: {
          services: true,
          filial: true,
        },
      })
    );
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    res.json(
      await AppDataSource.getRepository(ProductsEntity).find({
        relations: {
          services: true,
          filial: true,
        },
        where: { id: +id },
      })
    );
  }

  public async Post(req: Request, res: Response) {
    const { product_name, services, price, count, filial } = req.body;
    const products = await AppDataSource.getRepository(ProductsEntity)
      .createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values({ product_name, services, price, count, filial })
      .returning('*')
      .execute();

    res.json({
      status: 201,
      message: 'products created',
      data: products.raw[0],
    });
  }

  public async Put(req: Request, res: Response) {
    try {
      const { product_name, services, price, count, filial } = req.body;
      const { id } = req.params;

      const products = await AppDataSource.getRepository(ProductsEntity)
        .createQueryBuilder()
        .update(ProductsEntity)
        .set({ product_name, services, price, count, filial })
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'products updated',
        data: products.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const products = await AppDataSource.getRepository(ProductsEntity)
        .createQueryBuilder()
        .delete()
        .from(ProductsEntity)
        .where({ id })
        .returning('*')
        .execute();

      res.json({
        status: 200,
        message: 'products deleted',
        data: products.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductsController();
