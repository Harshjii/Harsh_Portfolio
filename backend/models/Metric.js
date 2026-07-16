const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Project Name is required'],
      unique: true,
      trim: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Metric', metricSchema);
