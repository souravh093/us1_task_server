import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AvailabilityService } from './availability.service';

const createAvailability = catchAsync(async (req, res) => {
  const result = await AvailabilityService.createAvailability(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Availability created successfully',
    data: result,
  });
});

const deleteAvailability = catchAsync(async (req, res) => {
  await AvailabilityService.deleteAvailabilityFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Availability deleted successfully',
  });
});

export const AvailabilityController = {
  createAvailability,
  deleteAvailability,
};
