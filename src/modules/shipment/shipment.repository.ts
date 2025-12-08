import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { ShipmentAlreadyExist } from './errors/shipment.error';

@Injectable()
export class ShipmentRepository extends BaseRepositoty<
  Shipment,
  CreateShipmentDto,
  UpdateShipmentDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Shipment, entityManager);
  }

  insertShipment(
    shipmentDto: CreateShipmentDto,
    entityManager?: EntityManager,
  ): Promise<Shipment> {
    return this.insertOne(shipmentDto, entityManager);
  }

  updateShipment(
    updateShipmentDto: UpdateShipmentDto,
    shipment: Shipment,
    entityManager?: EntityManager,
  ): Promise<Shipment> {
    Object.assign(shipment, updateShipmentDto);
    return this.updateOne(shipment, entityManager);
  }

  deleteShipment(id: string): Promise<void> {
    return this.deleteOne(id);
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateShipmentDto | Partial<Shipment> | undefined,
  ): void {
    switch (error.driverError.constraint) {
      case 'UQ_SHIPMENT_NUMBER_YEAR':
        throw new ShipmentAlreadyExist({
          field: 'shipment_number',
        });
      case 'FK_SHIPMENT_CUSTOMER':
        throw new CustomerNotFound({
          id: entity!.customer_id,
        });
      default:
        console.error(error);
        throw new InternalServerErrorException();
    }
  }
}
