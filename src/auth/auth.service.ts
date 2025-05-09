import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { jwtDecode } from './jwt.decode';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(res: Response, email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { 
      sub: user._id,
      role: user.role
    };
    
    const token = this.jwtService.sign(payload);
    
    res
      .cookie('access_token', token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
  }

  async signUp(res: Response, registerDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const createdUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword
    });

    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    const payload = { 
      sub: createdUser._id,
      role: createdUser.role
    };
    
    const token = this.jwtService.sign(payload);
    
    res
      .cookie('access_token', token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      });
  }

  async getProfile(req: Request): Promise<any> {
    try {
      const token = req.cookies.access_token;
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const decoded = this.jwtService.verify(token);
      
      if (!decoded || !decoded.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      const userId = decoded.sub;
      
      const userData = await this.usersService.findOne(userId);
      
      if (!userData) {
        throw new UnauthorizedException('User not found');
      }

      return {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw error;
    }
  }
}