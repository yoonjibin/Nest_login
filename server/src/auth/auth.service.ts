import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/Entity/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async register(data: any) {
    const result = this.authRepository.findOne({ id: data.id });

    const hash = await bcrypt.hash(data.pw, 10);

    const UserData = await this.authRepository.create({
      id: data.id,
      pw: hash,
      name: data.name,
    });

    const User = this.authRepository.save(UserData);

    delete (await User).pw;

    return User;
  }
}
