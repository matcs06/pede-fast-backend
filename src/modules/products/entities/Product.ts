import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm"
import { User } from '../../users/entities/User';

@Entity("products")
class Product {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  quantity: string;

  @Column()
  usersId: string;

  @Column()
  image_url: string;

  @Column()
  enabled: boolean;

  @Column("text", { array: true, default: "{}" })
  options: string[]

  @ManyToOne(() => User, (user) => user.products)
  users: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Product };
