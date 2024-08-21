/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import bookService from '../services/book.service';

import { Request, Response, NextFunction } from 'express';

class BookController {
    public BookService = new bookService();

    //create new book
    public createBook = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.BookService.createBook(req.body);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'book created successfully'
          });
        } catch (error) {
          next(error);
        }
      };

      //fetch all book
      public getAllBook = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.BookService.getAllBook();
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All book fetched successfully'
          });
        } catch (error) {
          next(error);
        }
      };

      //get book by admin id
      public getBookAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.BookService.getBookAdmin(req.params.adminid);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'book fetched by adminId successfully'
          });
        } catch (error) {
          next(error);
        }
      };

      //get book by book id
      public getBookId = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.BookService.getBookId(parseInt(req.params.bookid));
         // console.log(req.params.bookid,"**********");
          
          res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'fetched book by id '
          });
        } catch (error) {
          next(error);
        }
      };

      //update book
      public updateBook = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const data = await this.BookService.updateBook(req.params.bookid, req.body);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'book updated successfully'
          });
        } catch (error) {
          next(error);
        }
      };

      //delete book
      public deleteBook = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          await this.BookService.deleteBook(req.params.bookid);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: {},
            message: 'book deleted successfully'
          });
        } catch (error) {
          next(error);
        }
      };

}


export default BookController;