import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SessionServices } from './session.service';

const createSession = catchAsync(async (req, res) => {
  const result = await SessionServices.createSessionIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Session created successfully',
    data: result,
  });
});

const getSessions = catchAsync(async (req, res) => {
  const { meta, result } = await SessionServices.getSessionsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sessions fetched successfully',
    meta,
    data: result,
  });
});

const getSessionById = catchAsync(async (req, res) => {
  const result = await SessionServices.getSessionByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Session fetched successfully',
    data: result,
  });
});

const updateSession = catchAsync(async (req, res) => {
  const result = await SessionServices.updateSessionIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Session updated successfully',
    data: result,
  });
});

const deleteSession = catchAsync(async (req, res) => {
  await SessionServices.deleteSessionFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Session deleted successfully',
  });
});

export const SessionController = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
