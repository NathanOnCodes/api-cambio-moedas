import { Test, TestingModule } from '@nestjs/testing';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { HttpStatus } from '@nestjs/common';
import { CreateConversionDto } from './dto/create-conversion.dto';

describe('ConversionController', () => {
  let controller: ConversionController;
  let  service: ConversionService;

  const mockConversionService = {
    findAllExchanges: jest.fn().mockResolvedValue([
      { 
        id: 1, 
        from: 'USD', 
        to: 'BRL', 
        rate: 5.0, 
        date: new Date()
      }
    ]),
    newConversion: jest.fn().mockResolvedValue({
      conversion: {
        id: 1,
        value: 500,
        symbol: "$"
      }
    }),
    destroy: jest.fn().mockResolvedValue(HttpStatus.OK)
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
    service = module.get<ConversionService>(ConversionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
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
      expect(service.findAllExchanges).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      mockConversionService.findAllExchanges.mockRejectedValueOnce(new Error('Database Error'));
      await expect(controller.findExchanges()).rejects.toThrow('Database Error');
    })
  });

  describe('createConversion', () => {
    it('should create a new conversion', async () => {
      const params: CreateConversionDto = {
        amount: 100,
        from: 'USD',
        to: 'BRL',
        rate: 5.0
      }

      const result = await controller.createConversion(params);
      expect(result.conversion).toBeDefined();
      expect(service.newConversion).toHaveBeenCalledWith(params);
    });
  });

  describe('deleteConversion', () => {
    it('should delete a conversion', async () => {
      const id = 1;
      const result = await controller.deleteConversion(id);
      expect(result).toBe(HttpStatus.OK);
      expect(service.destroy).toHaveBeenCalledWith(id);
    })
  })
}); 
