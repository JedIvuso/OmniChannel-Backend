import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../register-auth.dto/register-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from '../register-auth.dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async createUserAcc(dto: RegisterAuthDto) {
    const { email, password, employmentNumber, firstName, lastName } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword,
        employmentNumber,
        firstName,
        lastName,
        lastLogin: new Date('2023-09-11'),
      },
    });

    return {
      message: 'Created new User',
      respCode: '00',
    };
  }

  async login(dto: LoginAuthDto) {
    const { email, password } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestException(
        `User with the provided email: ${email}, does not exist`,
      );
    }

    const passwordsMatch = await this.comparePasswords({
      password,
      hash: existingUser.hashedPassword,
    });

    if (!passwordsMatch) {
      throw new BadRequestException({
        message: 'Invalid credentials',
      });
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        lastLogin: new Date(),
      },
    });

    const tokenObject = await this.signToken({
      id: existingUser.id,
      email: existingUser.email,
      employmentNumber: existingUser.employmentNumber,
    });

    return {
      message: 'Signed in successfully',
      respCode: '00',
      token: tokenObject.token,
      refreshToken: tokenObject.refreshToken,
      id: existingUser.id,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(args: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: {
    id: number;
    email: string;
    employmentNumber: number;
  }) {
    const payload = args;

    const [token, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '20m',
      }),
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '25m',
      }),
    ]);

    return { token, refreshToken };
  }

  async verifyRefreshToken(refToken: string) {
    const refreshTokenValid = await this.jwt.verifyAsync(refToken.toString(), {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return refreshTokenValid;
  }
}
