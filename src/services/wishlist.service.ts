import { log } from 'winston';
import sequelize, { DataTypes } from '../config/database';
import wishlist from '../models/wishlist';

class WishlistService {
  private wishlist = wishlist(sequelize, DataTypes);

  public getWishlist = async (body) => {
    const wishlistData = await this.wishlist.findAll({
      where: { 
        userId: body.userId 
      }
    });
    return wishlistData;
}

    public createWishlist = async (body) => {
        const wishlistData = await this.wishlist.findAll({
            where: {
              userId: body.userId
            }
          });
         // console.log(wishlistData);
          
          if (wishlistData.length > 0) {
            console.log(wishlistData.length);
            
            const wishlistItem = wishlistData.find(item => item.bookId == body.bookId);
            console.log(wishlistItem);
            
            if (wishlistItem) {
                return "Item Already Exists";
            }
           else {
            const obj = {
              "bookId": body.bookId,
              "userId": body.userId
            }
          
            const data = await this.wishlist.create(obj);
            console.log(data);
            
            return data
          }
          }
    }

    public deleteWishlist = async (body) => {
    const wishlistData = await this.wishlist.destroy({
      where: { 
        userId: body.userId 
      }
    });
    return wishlistData
  }
}

export default WishlistService;