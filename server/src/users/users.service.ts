import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/Entity/auth.entity';
import { Repository } from 'typeorm';
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}
  async findOne(id: string) {
    return this.authRepository.findOne({ id: id });
  }
}
