import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Put(':id')
  async update(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id,
  ): Promise<Item> {
    return await this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id): Promise<Item> {
    return await this.itemsService.delete(id);
  }
}
