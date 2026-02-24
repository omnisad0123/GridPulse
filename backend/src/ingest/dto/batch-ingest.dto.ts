import { IngestPayloadDto } from './ingest-payload.dto';

export interface BatchIngestDto {
  records: IngestPayloadDto[];
}
