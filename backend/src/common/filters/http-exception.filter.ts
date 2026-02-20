import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GridPulseException } from '../exceptions/gridpulse.exception';

@Catch(HttpException, GridPulseException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | GridPulseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const requestId = request.headers['x-request-id'] ?? 'local-request';
    if (exception instanceof GridPulseException) {
      response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        code: exception.code,
        message: exception.message,
        details: exception.details,
        requestId,
      });
      return;
    }
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      requestId,
    });
  }
}
