import express, { IRouter } from 'express';
import bookController from '../controllers/book.controller';
import userValidator from '../validators/user.validator';
import { adminAuth, userAuth } from '../middlewares/auth.middleware';
import adminVerify from '../validators/user.validator';

class BookRoutes {
    private BookController = new bookController();
    private router = express.Router();
    private admin = new adminVerify();

    constructor() {
        this.routes();
      }

      private routes = () => {

        this.router.post('/admin', adminAuth, this.admin.adminVerify, this.BookController.createBook); // create book // validator for admin role
        // create book

        this.router.get('/', userAuth, this.BookController.getAllBook); //// fetch all book for user

        this.router.get('/admin', adminAuth, this.BookController.getAllBook); // fetch all book

        this.router.get('/:adminid', adminAuth, this.BookController.getBookAdmin); // get books by id of admin

        this.router.get('/bookByID/:bookid', adminAuth, this.BookController.getBookId);  // get book by id

        this.router.post('/:bookid/update', adminAuth, this.BookController.updateBook); //update book by id

        this.router.delete('/:bookid/delete', adminAuth, this.BookController.deleteBook)// delete book





      }

      public getRoutes = (): IRouter => {
        return this.router;
      };

}

export default BookRoutes;