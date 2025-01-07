import { Response } from '@nestjs/common';

export interface ServiceResponseBuild {
  status: boolean;
  message?: string;
  data?: any;
}

export interface ControllerResponseBuild {
  status: 'successful' | 'failed';
  message?: string;
  data?: any;
}

export class ResponsesHelper {
  serviceFailResponse(message: string): ServiceResponseBuild {
    return { status: false, message: message };
  }

  serviceSuccessResponse(
    data: any = {},
    message?: string,
  ): ServiceResponseBuild {
    return { status: true, data: data, message: message };
  }

  buildControllerResponse(
    serviceResponse: ServiceResponseBuild,
  ): ControllerResponseBuild {
    return {
      status: serviceResponse.status ? 'successful' : 'failed',
      message: serviceResponse.message,
      data: serviceResponse.data,
    };
  }
}
