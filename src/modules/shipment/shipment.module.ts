import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { ShipmentRepository } from './shipment.repository';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentResolver, ShipmentService, ShipmentRepository],
})
export class ShipmentModule {}
