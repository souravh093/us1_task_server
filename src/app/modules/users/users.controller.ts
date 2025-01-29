import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './users.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successful',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const { result, meta } = await UserService.getUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    meta,
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const result = await UserService.getUserByEmailFromDB(req.params.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUserIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await UserService.deleteUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'User deleted successfully',
  });
});

export const UserController = {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
};
