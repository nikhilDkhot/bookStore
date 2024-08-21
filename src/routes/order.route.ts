import express, { IRouter } from 'express';
import orderController from '../controllers/order.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class OrderRoutes {
  private OrderController = new orderController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.get('/:orderId', userAuth, this.OrderController.getOrder); 
    
    // get order book
    this.router.get('/:userId/userId', userAuth, this.OrderController.getAllOrder);

    this.router.post('/', userAuth, this.OrderController.createOrder);  // create order 

    this.router.post('/cart', userAuth, this.OrderController.createOrderCart); // create cart order book
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default OrderRoutes;