import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseRepositoty } from 'src/shared/base/repository';
import { CustomerNotFound } from 'src/shared/domain-errors';
import { EntityManager } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Shipment } from './entities/shipment.entity';

@Injectable()
export class ShipmentRepository extends BaseRepositoty<
  Shipment,
  CreateShipmentDto
> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Shipment, entityManager);
  }

  async insertShipment(
    shipmentDto: CreateShipmentDto,
    entityManager?: EntityManager,
  ): Promise<Shipment> {
    const manager = this.getManager(entityManager);
    const newShipment = this.create(shipmentDto);

    try {
      const {
        identifiers: [{ id }],
        raw,
      } = await manager.insert(Shipment, newShipment);

      return manager.findOne(Shipment, {
        where: {
          id,
        },
      }) as Promise<Shipment>;
    } catch (error) {
      throw this.handleDatabaseError(error, shipmentDto);
    }
  }

  protected translateDatabaseError(
    error: any,
    entity?: CreateShipmentDto | Partial<Shipment> | undefined,
  ): void {
    switch (error.driverError.constraint) {
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
