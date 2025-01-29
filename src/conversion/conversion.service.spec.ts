import { Test, TestingModule } from '@nestjs/testing';
import { ConversionService } from './conversion.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Conversion } from '../entities/conversion.entity';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { HttpStatus } from '@nestjs/common';

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
    find: jest.fn().mockResolvedValue(mockConversion),
    save: jest.fn().mockImplementation((conversion) => Promise.resolve(conversion)),
    delete: jest.fn().mockImplementation((id) => Promise.resolve({ affected: 1 }))
  };

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

    describe('newConversion', () => {
      it('should create a new conversion BRL', async () => {
        const newConversion : CreateConversionDto = {
          amount: 100,
          rate: 5,
          to: 'BRL',
          from: 'USD'
        }
        const result = await service.newConversion(newConversion);
        expect(result.status).toBe(HttpStatus.CREATED);
        expect(result.conversion).toEqual({
          value: 500,
          symbol: 'R$',
        });
        expect(repository.save).toHaveBeenCalledWith({
          value: 500,
          symbol: 'R$',
        });
      })})

      describe('remove conversion', () =>{
        it('should remove a conversion', async () => {
          const id = 1
          const res = await service.destroy(id)
          expect(res).toBe(HttpStatus.OK);
          expect(repository.delete).toHaveBeenCalledWith(id);
        })

        it('should handle deletion of non-existent id', async () => {
          const id = 999;
          mockRepository.delete.mockRejectedValueOnce(new Error('Conversion not found'));
          await expect(service.destroy(id)).rejects.toThrow('Conversion not found');
        })
      });
});
