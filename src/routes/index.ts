import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome to Book Store');
  });
  router.use('/users', new userRoute().getRoutes());

  router.use('/book', new bookRoute().getRoutes());

  router.use('/cart', new cartRoute().getRoutes());


  return router;
};

export default routes;
