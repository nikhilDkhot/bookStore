import sequelize, { DataTypes } from '../config/database';
import cart from '../models/cart';

class CartService {
  private Cart = cart(sequelize, DataTypes);

     // Get cart by user ID
  public getCart = async (id) => {
    const data = await this.Cart.findAll({
      where: { userId: id }
    });
    return data;
  };

  //create cart
  public createCart = async (body) => {
    const cartData = await this.Cart.findAll({
        where: {
            userId: body.userId
        }
    })
   
    
    if (cartData.length > 0){
        const cartBook = cartData.find(item => item.bookId == body.bookId);
        if (cartBook){
            cartBook.quantity = body.quantity;
            const updateCart = await cartBook.save();
            return updateCart;
        } else {
            const obj = {
                "bookId": body.bookId,
                "userId": body.userId,
                "quantity": body.quantity,
                "price": body.price
              }
              const data = await this.Cart.create(obj);
              return data;
        }
    }else{
        const obj = {
            "bookId": body.bookId,
            "userId": body.userId,
            "quantity": body.quantity,
            "price": body.price
          }
          const data = await this.Cart.create(obj);
          return data
    }
  };

  public increaseBook = async (body) => {
    const cartData = await this.Cart.findAll({
      where: {
        userId : body.userId
      }
    });
    //console.log(cartData);
    if (cartData.length > 0) {
      const cartItem = cartData.find(item => item.bookId == body.bookId);
      console.log(cartItem);
      
      if (cartItem){
         let quantity = cartItem.quantity;
         console.log(quantity,"ppppp");
         
         quantity += 1;
         cartItem.quantity = quantity;

        const data = await cartItem.save();
        return data;
      } else {
       /*  const obj = {
          "bookId": body.bookId,
          "userId": body.userId,
          "quantity": body.quantity,
          "price": body.price
        }
        const data = await this.Cart.create(obj);
        return data */
        return "cart value not increased"
      }
    } else {
      /*  const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Cart.create(obj);
      return data */
      return "cart value not increased out"
    }    
    
  };

  public decreaseBook = async (body) => {
    const cartData = await this.Cart.findAll({
      where: {
        userId : body.userId
      }
    });
    if (cartData.length > 0) {
      const cartItem = cartData.find(item => item.bookId == body.bookId);
      if (cartItem){
         let quantity = cartItem.quantity;
         quantity -= 1;
         cartItem.quantity = quantity;

        const data = await cartItem.save();
        return data;
      } else {
        const obj = {
          "bookId": body.bookId,
          "userId": body.userId,
          "quantity": body.quantity,
          "price": body.price
        }
        const data = await this.Cart.create(obj);
        return data
      }
    } else {
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Cart.create(obj);
      return data
    }  
  };

  public deleteCart = async (body) => {
    const cartData = await this.Cart.destroy({
      where: { 
        userId: body.userId 
      }
    });
    return cartData
  }


}


export default CartService;