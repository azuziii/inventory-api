import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { GetByIdArgs } from 'src/shared/args/get-by-id/get-by-id.args';
import { AutoMap } from 'src/shared/decorators/meta/auto-map.decorator';
import { ResponseType } from 'src/shared/decorators/meta/error-response-type.decorator';
import { DeleteResponse } from 'src/shared/responses/delete.response';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentInput } from './inputs/create-shipment.input';
import { UpdateShipmentInput } from './inputs/update-shipment.input';
import { ShipmentOutput } from './outputs/shipment.output';
import { CreateShipmentResponse } from './responses/create-shipment.response';
import { DeleteShipmentResponse } from './responses/delete-shipment.response';
import { ShipmentQueryResponse } from './responses/query-shipment.response';
import { UpdateShipmentResponse } from './responses/update-shipment.response';
import { ShipmentService } from './shipment.service';

@Injectable()
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @ResponseType(ShipmentQueryResponse)
  @AutoMap(ShipmentOutput)
  @Query(() => ShipmentQueryResponse, { name: 'shipment' })
  async getShipment(@Args() { id }: GetByIdArgs): Promise<Shipment> {
    return this.shipmentService.getShipmentOrFail(id);
  }

  @ResponseType(CreateShipmentResponse)
  @AutoMap(ShipmentOutput)
  @Mutation(() => CreateShipmentResponse, { name: 'createShipment' })
  async createShipment(
    @Args('input') input: CreateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.createShipment(input);
  }

  @ResponseType(UpdateShipmentResponse)
  @AutoMap(ShipmentOutput)
  @Mutation(() => UpdateShipmentResponse, { name: 'updateShipment' })
  async updateShipment(
    @Args('input', { type: () => UpdateShipmentInput, nullable: false })
    input: UpdateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.updateShipment(input);
  }

  @ResponseType(DeleteShipmentResponse)
  @Mutation(() => DeleteShipmentResponse, { name: 'deleteShipment' })
  async deleteShipment(@Args() { id }: GetByIdArgs): Promise<DeleteResponse> {
    return this.shipmentService.deleteShipment(id);
  }
}
