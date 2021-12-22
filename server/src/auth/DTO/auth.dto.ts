import { IsOptional, IsString } from 'class-validator';

export class authUserDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly pw: string;
  @IsString()
  @IsOptional()
  readonly name: string;
}
