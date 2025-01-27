import { Test, TestingModule } from '@nestjs/testing';
import { ConversionService } from './conversion.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Conversion } from '../entities/conversion.entity';
import { error } from 'console';

describe('ConversionService', () => {
  let service: ConversionService;
  let repository: Repository<Conversion>;

  const mockConversion = [
    {
      id: 1,
      createdAt: new Date(),
      value: 520.00,
      symbol: "$"
    },
    {
      id: 2,
      createdAt: new Date(),
      value: 100.00,
      symbol: "€"
    }
  ]
  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockConversion)
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversionService,
        {
          provide: getRepositoryToken(Conversion),
          useValue: mockRepository
        }

      ],
    }).compile();

    service = module.get<ConversionService>(ConversionService);
    repository = module.get<Repository<Conversion>>(getRepositoryToken(Conversion));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('findAllExchages', () => {
    it('should return an array of conversions', async () => {
      const result = await service.findAllExchanges();

      expect(result).toEqual(mockConversion);
      expect(repository.find).toHaveBeenCalledTimes(1);
    })
  });

    it('should handle empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      const result = await service.findAllExchanges();
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error('Error'));
      await expect(service.findAllExchanges()).rejects.toThrow('Error');
    })
});
