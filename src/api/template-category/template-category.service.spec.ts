import { Test, TestingModule } from '@nestjs/testing';
import { TemplateCategoryService } from './template-category.service';

describe('TemplateCategoryService', () => {
  let service: TemplateCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateCategoryService],
    }).compile();

    service = module.get<TemplateCategoryService>(TemplateCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
