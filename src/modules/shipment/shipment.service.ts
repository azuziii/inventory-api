import { Injectable } from '@nestjs/common';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { DataSource, FindManyOptions } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { ShipmentNotFound } from './errors/shipment.error';
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

  updateShipment(shipmentDto: UpdateShipmentDto): Promise<Shipment> {
    return this.datasource.transaction(async (entityManager) => {
      const shipment = await entityManager.findOne(Shipment, {
        where: { id: shipmentDto.id },
      });

      if (!shipment) {
        throw new ShipmentNotFound({
          id: shipmentDto.id,
        });
      }

      return this.repo.updateShipment(shipmentDto, shipment, entityManager);
    });
  }

  async getShipmentOrFail(id: string): Promise<Shipment> {
    const shipment = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!shipment) {
      throw new ShipmentNotFound({
        id,
      });
    }

    return shipment;
  }

  listShipments(
    options: FindManyOptions<Shipment>,
  ): Promise<[Shipment[], number]> {
    return this.repo.findAndCount(options);
  }

  async deleteShipment(id: string): Promise<DeleteResponse> {
    await this.repo.deleteShipment(id);
    return new DeleteResponse(id);
  }
}
