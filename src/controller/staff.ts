import {Request, Response} from 'express';
import {AppDataSource} from '../data-source';
import {StaffEntity} from '../entities/staff';
import {hashed} from '../utils/hashed';
import {sign} from '../utils/jwt';
import {compare} from '../utils/compare';

class StaffController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(StaffEntity).find({
            select: {
                id: true,
                staff_name: true,
                staff_surname: true,
                birthday: true,
                phone: true,
                image: true,
                email: true,
                passport: true,
                salary: true,
                role: true,
                number_app: true,
                createdAt: true,
                updateAt: true
            },
            order: {number_app: "DESC"},
            relations: {
                filial: true,
                task: true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const {id} = req.params

        res.json(await AppDataSource.getRepository(StaffEntity).find({
            select: {
                id: true,
                staff_name: true,
                staff_surname: true,
                birthday: true,
                phone: true,
                image: true,
                email: true,
                passport: true,
                salary: true,
                role: true,
                number_app: true,
                createdAt: true,
                updateAt: true
            },
            order: {number_app: "DESC"}
            , relations: {
                filial: true,
                task: true
            }, where: {id: +id}
        }));
    }

    public async Post(req: Request, res: Response) {
        let {
            staff_name,
            staff_surname,
            birthday,
            passport,
            phone,
            image,
            email,
            password,
            salary,
            role,
            filial
        } = req.body
        password = await hashed(password);

        const staff = await AppDataSource.getRepository(StaffEntity).createQueryBuilder().insert().into(StaffEntity).values({
            staff_name,
            staff_surname,
            birthday,
            passport,
            phone,
            image,
            email,
            password,
            salary,
            role,
            filial
        }).returning("*").execute()

        res.json({
            status: 201,
            message: "Staff created",
            data: staff.raw[0]
        })
    }

    public async SignIn(req: Request, res: Response) {
        try {
            const {email, password} = req.body

            const foundStaff = await AppDataSource.getRepository(StaffEntity).findOne({
                relations: {
                    filial: true
                }, where: {email}
            })
            if (foundStaff) {
                if (await compare(password, foundStaff.password) == true) {
                    return res.json({
                        status: 200,
                        message: "STAFF login successful",
                        token: sign({id: foundStaff.id}),
                        data: foundStaff
                    })
                } else {
                    res.status(401).json({
                        status: 401,
                        message: "wrong email or password",
                        token: null,
                    })
                }
            } else {
                res.status(401).json({
                    status: 401,
                    message: "wrong email or password",
                    token: null,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    public async Put(req: Request, res: Response) {
        try {
            const {id} = req.params
            let {number_app} = req.body
            const staff = await AppDataSource.getRepository(StaffEntity).findOneBy({id: +id})

            number_app += staff.number_app

            const tasks = await AppDataSource.getRepository(StaffEntity).createQueryBuilder().update(StaffEntity)
                .set({number_app})
                .where({id})
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "task updated",
                data: tasks.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

}

export default new StaffController();

