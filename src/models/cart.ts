import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Cart extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
}

Cart.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
  }
);

export default Cart;
