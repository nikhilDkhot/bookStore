/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import cartService from '../services/cart.service';

import { Request, Response, NextFunction } from 'express';

class CartController {
  public CartService = new cartService();

  public getCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.getCart(req.body.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All cart fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public createCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.createCart(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'createed new cart'
      });
    } catch (error) {
      next(error);
    } 
  };

  public updateCartAdd = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      console.log(req.body);
      const data = await this.CartService.increaseBook(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'qauntity increase successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCartDes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.decreaseBook(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'qauntity reduce successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.deleteCart(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'delete cart successfully'
      });
    } catch (error) {
      next(error);
    }
  };

}

export default CartController;