const Metric = require('../models/Metric');

// @desc    Record a click event (increment count)
// @route   POST /api/metrics/click
// @access  Public
const recordClick = async (req, res, next) => {
  try {
    const projectName = req.body.projectName || req.body.elementId;

    if (!projectName) {
      res.status(400);
      throw new Error('Please provide a projectName');
    }

    // Find project metric and increment count. If it doesn't exist, create it.
    const metric = await Metric.findOneAndUpdate(
      { projectName: projectName },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Click count updated successfully',
      data: metric
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all click counts
// @route   GET /api/metrics/clicks
// @access  Public
const getClicks = async (req, res, next) => {
  try {
    const metrics = await Metric.find().sort({ count: -1 });
    
    // Calculate total clicks across all projects
    const totalClicksResult = await Metric.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$count' }
        }
      }
    ]);
    const totalClicks = totalClicksResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      totalClicks,
      data: metrics
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordClick,
  getClicks
};
