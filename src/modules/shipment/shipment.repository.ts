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

  async updateShipment(
    { id, ...updateShipmentDto }: UpdateShipmentDto,
    shipment: Shipment,
    entityManager?: EntityManager,
  ): Promise<Shipment> {
    try {
      const manager = this.getManager(entityManager);

      Object.assign(shipment, updateShipmentDto);

      await manager.update(Shipment, id, shipment);
      return manager.findOne(Shipment, {
        where: { id },
      }) as Promise<Shipment>;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }
  async deleteShipment(id: string): Promise<void> {
    try {
      const deleteResult = await this.delete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
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
