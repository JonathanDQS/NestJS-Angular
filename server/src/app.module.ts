import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers/app.controller';
import { ChosenLocation, SupportSchema } from './schemas/support.schema';
import { SupportService } from './services/support.service';
import { WeatherService } from './services/weather.service';
import { CONFIGURATION } from './constants/constants';

@Module({
  imports: [MongooseModule.forRoot(`${CONFIGURATION.MONGOCONNECTION}weatherSupport`),
    MongooseModule.forFeature([{ name: ChosenLocation.name, schema: SupportSchema }]),
  ],
  controllers: [AppController],
  providers: [WeatherService, SupportService],
})

export class AppModule { }
