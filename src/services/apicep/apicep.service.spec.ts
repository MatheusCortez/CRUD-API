import { Test, TestingModule } from '@nestjs/testing';
import { ApicepService } from './apicep.service';

describe('ApicepService', () => {
  let apiService: ApicepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApicepService],
    }).compile();

    apiService = module.get<ApicepService>(ApicepService);
  });
  describe('Smoke Test', () => {
    it('should be defined', () => {
      expect(apiService).toBeDefined();
    });

    it('should call  the search method', () => {
      expect(apiService.search).toBeDefined();
    });
  });
});
