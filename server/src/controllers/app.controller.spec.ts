import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { WeatherService } from '../services/weather.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [WeatherService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getCurrent()).toBe('Hello World!');
    });
  });
});
