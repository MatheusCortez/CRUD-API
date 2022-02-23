import { Module } from '@nestjs/common';
import { apiCepService } from './apicep/apicep.service';

@Module({
  providers: [apiCepService],
})
export class ServicesModule {}
