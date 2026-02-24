import { IngestMeterDto } from './ingest-meter.dto';
import { IngestVehicleDto } from './ingest-vehicle.dto';

export type IngestPayloadDto = IngestMeterDto | IngestVehicleDto;
