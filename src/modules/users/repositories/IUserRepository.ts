import { Product } from '../../products/entities/Product';
import { User } from '../entities/User';

interface ICreateUserDTO {
   name: string;
   username: string;
   password: string;
   user_level: string;
}

interface IUserRepository {
   create({
      name, password, username, user_level
   }: ICreateUserDTO): Promise<void>;

   deleteById(id: string): Promise<void>;
   findByName(username: string): Promise<User | undefined>;
   findById(username: string): Promise<User | undefined>;
   findAll(): Promise<User[]>;
   save(data: User): Promise<void>;
   findUserProducts(username: string): Promise<Product[] | undefined>
}

export { IUserRepository, ICreateUserDTO };