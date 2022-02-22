import { Test, TestingModule } from '@nestjs/testing';
import { apiCepService } from './apicep.service';

describe('ApicepService', () => {
  let apiService: apiCepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [apiCepService],
    }).compile();

    apiService = module.get<apiCepService>(apiCepService);
  });
  describe('Api Cep Service', () => {
    it('should be defined', () => {
      expect(apiService).toBeDefined();
    });

    it('should call  the search method', () => {
      expect(apiService.search).toBeDefined();
    });
  });
});
