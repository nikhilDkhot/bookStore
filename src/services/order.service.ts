import sequelize, { DataTypes } from '../config/database';
import order from '../models/order';
import book from '../models/book';
import user from '../models/user';
import {sendEmail} from '../utils/mail.util';

class OrderService {
  private Order = order(sequelize, DataTypes);
  private Book = book(sequelize, DataTypes);
  private User = user(sequelize, DataTypes);


  // Get get all book of user
  public getAllOrder = async (id) => {
    const data = await this.Order.findAll({
      where: { userId: id }
    });
    return data;
  };

  // Get order by book id
  public getOrder = async (id) => {
    const data = await this.Order.findAll({
      where: { id: id }
    });
    return data;
  };

  //create order
  public createOrder = async (body) => {
    const bookData = await this.Book.findOne({
      where: {
        id : body.bookId
      }
    });
    if (bookData.quantity < body.quantity){
      throw new Error ('Book quantity Out of range');
    }
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": bookData.price
      }
      const data = await this.Order.create(obj);
      bookData.quantity = bookData.quantity - body.quantity;
      const updateBook = await bookData.save();
      if (updateBook){
        const user = await this.User.findOne({
          where: {
            id: body.userId
          }
        })
        
        const mail = await sendEmail(user.email);
        return 'Order Placed Successfully';
      }
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