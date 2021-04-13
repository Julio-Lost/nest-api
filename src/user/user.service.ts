import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    const users = await this.userRepository.find();

    const userFindEmpty = !users;

    if (userFindEmpty) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    const userEmpty = !user;

    if (userEmpty) {
      throw new NotFoundException('Não foi encontrado usuario com esse id.');
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);

    const userSaved = await this.userRepository.save(user);

    const userSavedEmpty = !userSaved;

    if (userSavedEmpty) {
      throw new InternalServerErrorException(
        'Não foi possivel criar um usuario.',
      );
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);

    await this.userRepository.update(user, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);

    const deleted = await this.userRepository.delete(user);

    if (deleted) {
      return true;
    }
    return false;
  }
}
