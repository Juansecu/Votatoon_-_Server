import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly _APP_SERVICE: AppService) {}

  @ApiProduces('application/xml')
  @ApiOkResponse({
    description: 'Returns the cross domain policy',
    schema: {
      properties: {
        'allow-access-from': {
          properties: {
            domain: {
              example: '*',
              type: 'string',
              xml: {
                attribute: true,
                name: 'domain'
              }
            }
          }
        }
      },
      xml: {
        name: 'cross-domain-policy'
      }
    }
  })
  @Get('crossdomain.xml')
  getCrossDoman(): string {
    return this._APP_SERVICE.getCrossDoman();
  }
}
