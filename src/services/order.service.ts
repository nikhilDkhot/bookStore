import sequelize, { DataTypes } from '../config/database';
import order from '../models/order';

class OrderService {
  private Order = order(sequelize, DataTypes);

  // Get order by user ID
  public getOrder = async (id) => {
    const data = await this.Order.findAll({
      where: { userId: id }
    });
    return data;
  };

  public createOrder = async (body) => {
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Order.create(obj);
      return data;
    }   


  // Method to increase book quantity or add a new book
  public createOrderCart = async (body) => {
    const cartData = await this.Order.create({
      where: {
        userId : body.userId
      }
    });
       
  };

 
}

export default OrderService;