const mongoose = require("mongoose");
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d", // Token will expire after 1 day
  },
});

module.exports = mongoose.model("blacklistToken", blacklistTokenSchema);
