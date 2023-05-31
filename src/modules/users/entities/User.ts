import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"
import { Product } from "../../products/entities/Product";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  business_name: string;

  @Column()
  address: string;

  @Column()
  payment_day: string;

  @Column()
  payment_status: string;

  @Column()
  user_level: string;

  @Column()
  business_image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, (product) => product.users)
  products: Product[]

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}

export { User }