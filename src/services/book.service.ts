import sequelize, { DataTypes } from '../config/database';
import Logger from '../config/logger'

import book from '../models/book';


//create book
class BookService {
  private Book = book(sequelize, DataTypes);
  private logger = Logger.logger;

  //create 
  public createBook = async (body) => {
    const obj = {
      "description": body.description,
      "discountPrice": body.discountPrice,
      "bookImage": " ",
      "admin_user_id": body.userId,
      "bookName": body.bookName,
      "author": body.author, 
      "quantity":body.quantity,
      "price": body.price
    }
    const data = await this.Book.create(obj);
    return data;
  };

  //fetch all book
  public getAllBook = async () => {
    const data = await this.Book.findAll();
    return data;
  };

  //fetch book by admin id
   public getBookAdmin = async (id) => {
    const data = await this.Book.findAll({ where: { admin_user_id: id } });
    return data;
  }; 

 /* public getBookId = async (id) => {
    await this.Book.update(body, {
      where: { id: id }
    });
    return body;
  };*/

  //fetch book by id
  public getBookId = async (id): Promise<any> => {
    try {
      console.log('inside book services, Getting book');
      const data = await this.Book.findOne({ where: { id:id } });
     // console.log(data);
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching note with ID ${id}: ${error.message}`);
    }
  }

  //update book by id
  public updateBook = async (id, body) => {
     await this.Book.update(body, {
      where: { id: id }
    });
    return body;
  };

  public deleteBook = async (id) => {
   const data = await this.Book.destroy({ where: { id: id } });
    return data;
  };

  

}



export default BookService;