import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/extended')
  getAllExtended(): any {
    return this.productService.getAllExtended();
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    return this.productService.getExtendedById(id);
  }

  @Get('/')
  getAll(): any {
    return this.productService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    return this.productService.getById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.productService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productService.create(productData);
  }

  @Put('/:id')
  async edit(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.productService.updateById(id, productData);
    return { success: true };
  }
}
