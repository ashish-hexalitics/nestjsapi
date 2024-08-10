import { Test, TestingModule } from '@nestjs/testing';
import { TemplateCategoryController } from './template-category.controller';

describe('TemplateCategoryController', () => {
  let controller: TemplateCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateCategoryController],
    }).compile();

    controller = module.get<TemplateCategoryController>(TemplateCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
