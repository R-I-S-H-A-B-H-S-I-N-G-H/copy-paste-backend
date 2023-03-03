const mongoose = require("mongoose");
const copypaste = new mongoose.Schema({
	data: {
		type: String,
	},
});
module.exports = mongoose.model("copypaste", copypaste);
