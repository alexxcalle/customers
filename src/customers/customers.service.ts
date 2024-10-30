import { HttpException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try{
      return await this.prisma.customers.create({
        data: createCustomerDto,
      });
    }catch{
      throw new HttpException('Error creating customer', 500);
    }
  }

  findAll() {
    try{
      return this.prisma.customers.findMany();
    }catch{
      throw new HttpException('Error fetching customers', 500);
    };
  }

  findOne(id: string) {
    try{
      this.prisma.customers.findUnique({
        where: {id: id},
      });
    }catch{
      throw new HttpException('Error fetching customer', 500);
    };
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try{
      return this.prisma.customers.update({
        where: {id: id},
        data: updateCustomerDto,
      });
    }catch{
      throw new HttpException('Error updating customer', 500);
    }
  }

  remove(id: string) {
    try{
      return this.prisma.customers.delete({
        where: {id: id},
      });
    }catch{
      throw new HttpException('Error deleting customer', 500);
    }
  }
}
