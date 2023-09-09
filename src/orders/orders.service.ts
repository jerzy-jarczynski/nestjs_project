import { Injectable } from '@nestjs/common';
import { db, Order } from 'src/db';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.orders.filter((order) => order.id !== id);
    db.orders = db.orders.filter((order) => order.id !== id);
  }

  public create(orderData: Omit<Order, 'id'>) {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>) {
    db.orders = db.orders.map((order) =>
      order.id === id ? { ...order, ...orderData } : order,
    );
    return orderData;
  }
}
