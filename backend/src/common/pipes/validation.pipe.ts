import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GridPulseValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && (value === null || typeof value !== 'object')) {
      throw new BadRequestException('Request body must be an object');
    }
    return value;
  }
}
