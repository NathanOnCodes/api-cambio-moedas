import { Test, TestingModule } from '@nestjs/testing';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { Conversion } from 'src/entities/conversion.entity';

describe('ConversionController', () => {
  let controller: ConversionController;
  let conversionService: ConversionService;

  const mockConversionService = {
    findAllExchanges: jest.fn().mockResolvedValue([
      { 
        id: 1, 
        from: 'USD', 
        to: 'BRL', 
        rate: 5.0, 
        date: new Date()
      }
    ])
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionController],
      providers: [{
        provide: ConversionService,
        useValue: mockConversionService,
      }],
    }).compile();

    controller = module.get<ConversionController>(ConversionController);
    conversionService = module.get<ConversionService>(ConversionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(conversionService).toBeDefined();
  });

  describe('findAllExchanges', () => {
    it('should return an array of exchanges', async () =>{
      const expectedResult = [
        { 
          id: 1, 
          from: 'USD', 
          to: 'BRL', 
          rate: 5.0, 
          date: expect.any(Date)
        }
      ];

      const result = await controller.findExchanges();

      expect(result).toEqual(expectedResult);
      expect(conversionService.findAllExchanges).toHaveBeenCalled();
    })
  })
}); 
