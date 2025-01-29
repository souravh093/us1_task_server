import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, existUser } =
    await AuthServices.loginUserFromDB(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    token: {
      accessToken,
      refreshToken,
    },
    data: existUser,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
