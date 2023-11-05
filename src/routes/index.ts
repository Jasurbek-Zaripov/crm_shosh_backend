import { Router } from 'express';
import change from '../controller/change';
import consumption from '../controller/consumption';
import consumption_category from '../controller/consumption_category';
import filial from '../controller/filial';
import lids from '../controller/lids';
import old_orders from '../controller/old_orders';
import orders from '../controller/orders';
import products from '../controller/products';
import rooms from '../controller/rooms';
import services from '../controller/services';
import services_orders from '../controller/services_orders';
import staff from '../controller/staff';
import task from '../controller/task';
import users from '../controller/users';

const router = Router();

// filials rout
router.get('/filials', filial.Get);
router.get('/filials/:id', filial.GetId);
router.post('/filials', filial.Post);
router.put('/filials/:id', filial.Put);
router.delete('/filials/:id', filial.Delete);

// staff rout
router.get('/staff', staff.Get);
router.get('/staff/:id', staff.GetId);
router.post('/staff', staff.Post);
router.post('/login', staff.SignIn);
router.put('/staff/:id', staff.Put);

// rooms rout
router.get('/rooms', rooms.Get);
router.get('/emptyrooms', rooms.GetEmpty);
router.get('/rooms/:id', rooms.GetId);
router.post('/rooms', rooms.Post);
router.put('/rooms/:id', rooms.Put);
router.delete('/rooms/:id', rooms.Delete);

// consumption_category rout
router.get('/consumption_category', consumption_category.Get);
router.get('/consumption_category/:id', consumption_category.GetId);
router.post('/consumption_category', consumption_category.Post);
router.put('/consumption_category/:id', consumption_category.Put);
router.delete('/consumption_category/:id', consumption_category.Delete);

// consumption rout
router.get('/consumption', consumption.Get);
router.get('/consumption/:id', consumption.GetId);
router.get('/consumptionadmin', consumption.GetAdmin);
router.get('/consumptionmanager', consumption.GetManager);
router.post('/consumption', consumption.Post);
router.put('/consumption/:id', consumption.Put);
router.delete('/consumption/:id', consumption.Delete);

// Lids rout
router.get('/lids', lids.Get);
router.get('/newlids', lids.GetNew);
router.get('/lidsactive', lids.GetActive);
router.get('/lids/:id', lids.GetId);
router.post('/lids', lids.Post);
router.put('/lids/:id', lids.Put);
router.delete('/lids/:id', lids.Delete);

// orders rout
router.get('/orders', orders.Get);
router.get('/ordersbusy', orders.GetBusy);
router.get('/orders/:id', orders.GetId);
router.get('/orders/users/:id', orders.UsersOnly);
router.post('/orders', orders.Post);
router.put('/orders/:id', orders.Put);
router.delete('/orders/:id', orders.Delete);
router.delete('/deleteorders/:id', orders.DeleteOrders);
router.delete('/fulldelete/:id', orders.DeleteOrdersFull);

// users rout
router.get('/users', users.Get);
router.get('/users/:id', users.GetId);
router.post('/users', users.Post);
router.put('/users/:id', users.Put);
router.delete('/users/:id', users.Delete);

// services rout
router.get('/services', services.Get);
router.get('/services/:id', services.GetId);
router.post('/services', services.Post);
router.put('/services/:id', services.Put);
router.delete('/services/:id', services.Delete);

// products rout
router.get('/products', products.Get);
router.get('/products/:id', products.GetId);
router.post('/products', products.Post);
router.put('/products/:id', products.Put);
router.delete('/products/:id', products.Delete);

// services_orders
router.get('/services_orders', services_orders.Get);
router.get('/services_orders/:id', services_orders.GetId);
router.post('/services_orders', services_orders.Post);
router.put('/services_orders/:id', services_orders.Put);
router.delete('/services_orders/:id', services_orders.Delete);

// task
router.get('/task', task.Get);
router.get('/task/:id', task.GetId);
router.post('/task', task.Post);
router.put('/task/:id', task.Put);
router.delete('/task/:id', task.Delete);

// smena
router.get('/change', change.Get);
router.get('/changeadmin', change.GetAdmin);
router.get('/changemanager', change.GetManager);
router.get('/change/:id', change.GetId);
router.post('/change', change.Post);
router.put('/change/:id', change.Put);
router.delete('/changedelete/:id', change.Delete);

// old orders
router.get('/oldorders', old_orders.Get);
router.post('/oldorders', old_orders.Post);
router.put('/oldorders/:id', old_orders.Put);
router.delete('/oldorders/:id', old_orders.Delete);

export default router;
