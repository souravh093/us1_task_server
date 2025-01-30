import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillServices } from './skills.service';

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.createSkillsIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Skill created successfully',
    data: result,
  });
});

const getSkills = catchAsync(async (req, res) => {
  const { meta, result } = await SkillServices.getSkillsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skills fetched successfully',
    meta,
    data: result,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const result = await SkillServices.getSkillByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill fetched successfully',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.updateSkillIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill updated successfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  await SkillServices.deleteSkillFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Skill deleted successfully',
  });
});

export const SkillController = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
