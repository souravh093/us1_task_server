import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getReviews = catchAsync(async (req, res) => {
  const { result, meta } = await ReviewServices.getReviewsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews fetched successfully',
    meta,
    data: result,
  });
});


export const ReviewController = {
  createReview,
  getReviews,
};