import {
    HttpStatus,
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Res,
    Param,
    Body,
  } from '@nestjs/common';
  import { SkillsService } from './skills.service';
  import { Response } from 'express';
  import { SkillDto } from '../../dto/skills/skill.dto';
  
  @Controller('/api/skills')
  export class SkillsController {
    constructor(private skillsService: SkillsService) {}
  
    @Get()
    async getAllSkills(@Res() res: Response) {
      const skills = await this.skillsService.getAllSkills();
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Skills fetched successfully', skills });
    }
  
    @Get('/:id')
    async getSkill(@Param('id') id: string, @Res() res: Response) {
      const skill = await this.skillsService.getSkill(id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Skill fetched successfully', skill });
    }
  
    @Post()
    async create(@Body() skillDto: SkillDto, @Res() res: Response) {
      const skill = await this.skillsService.createSkill(skillDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Skill created successfully', skill });
    }
  
    @Put('/:id')
    async update(@Param('id') id: string, @Body() skillDto: SkillDto, @Res() res: Response) {
      const updatedSkill = await this.skillsService.updateSkill(id, skillDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Skill updated successfully', updatedSkill });
    }
  
    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
      const skill = await this.skillsService.deleteSkill(id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Skill deleted successfully', skill });
    }
  }
  