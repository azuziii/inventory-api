import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { ShipmentRepository } from './shipment.repository';

@Injectable()
export class ShipmentService {
  constructor(
    private readonly repo: ShipmentRepository,
    private readonly datasource: DataSource,
  ) {}

  createShipment(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    return this.datasource.transaction(async (entityManager) => {
      const shipment = await this.repo.insertShipment(
        createShipmentDto,
        entityManager,
      );

      return shipment;
    });
  }
}
