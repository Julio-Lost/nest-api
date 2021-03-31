import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
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
      throw new InternalServerErrorException(
        'Não foi possivel buscar os usuarios.',
      );
    }
    return users;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    const userSavedEmpty = !userSaved;

    if (userSavedEmpty) {
      throw new InternalServerErrorException(
        'Não foi possivel criar um usuario.',
      );
    }

    return userSaved;
  }
}
