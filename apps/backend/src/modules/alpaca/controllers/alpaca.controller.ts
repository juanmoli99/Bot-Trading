import { Body, Controller, Get, Post } from '@nestjs/common';

import { AlpacaAccountResponseDto } from '../dto/alpaca-account.response.js';
import { AlpacaClockResponseDto } from '../dto/alpaca-clock.response.js';
import { AlpacaOrderResponseDto } from '../dto/alpaca-order.response.js';
import { AlpacaPositionResponseDto } from '../dto/alpaca-position.response.js';
import type { CreateAlpacaOrderDto } from '../dto/create-alpaca-order.dto.js';
import type { GetAlpacaAccountUseCase } from '../use-cases/get-alpaca-account.use-case.js';
import type { GetAlpacaClockUseCase } from '../use-cases/get-alpaca-clock.use-case.js';
import type { GetAlpacaOrdersUseCase } from '../use-cases/get-alpaca-orders.use-case.js';
import type { GetAlpacaPositionsUseCase } from '../use-cases/get-alpaca-positions.use-case.js';
import type { CreateAlpacaOrderUseCase } from '../use-cases/create-alpaca-order.use-case.js';

@Controller('alpaca')
export class AlpacaController {
  constructor(
    private readonly getAlpacaAccountUseCase: GetAlpacaAccountUseCase,
    private readonly getAlpacaClockUseCase: GetAlpacaClockUseCase,
    private readonly getAlpacaPositionsUseCase: GetAlpacaPositionsUseCase,
    private readonly getAlpacaOrdersUseCase: GetAlpacaOrdersUseCase,
    private readonly createAlpacaOrderUseCase: CreateAlpacaOrderUseCase,
  ) {}

  @Get('account')
  async getAccount(): Promise<AlpacaAccountResponseDto> {
    const account = await this.getAlpacaAccountUseCase.execute();

    return new AlpacaAccountResponseDto(account);
  }

  @Get('clock')
  async getClock(): Promise<AlpacaClockResponseDto> {
    const clock = await this.getAlpacaClockUseCase.execute();

    return new AlpacaClockResponseDto(clock);
  }

  @Get('positions')
  async getPositions(): Promise<AlpacaPositionResponseDto[]> {
    const positions = await this.getAlpacaPositionsUseCase.execute();

    return positions.map((position) => new AlpacaPositionResponseDto(position));
  }

  @Get('orders')
  async getOrders(): Promise<AlpacaOrderResponseDto[]> {
    const orders = await this.getAlpacaOrdersUseCase.execute();

    return orders.map((order) => new AlpacaOrderResponseDto(order));
  }

  @Post('orders')
  async createOrder(
    @Body() dto: CreateAlpacaOrderDto,
  ): Promise<AlpacaOrderResponseDto> {
    const order = await this.createAlpacaOrderUseCase.execute(dto);

    return new AlpacaOrderResponseDto(order);
  }
}
