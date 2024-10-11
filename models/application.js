const { default: mongoose } = require("mongoose");


const applicationSchema = new mongoose.Schema({
    recruiterUserID: String,
    name: String,
    email: String,
    candidateUserId: String,
    status: Array,
    jobID: String,
    jobAppliedDate: String,
})

const application = mongoose.models.Application || mongoose.model("Application", applicationSchema)

module.exports = application