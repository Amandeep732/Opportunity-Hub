import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true

    },
    desc: {
        type: String
    },
    time: {
        type: Date,
    },
    expiryDate: {
      type: Date, // event registration close or end time
      required: true
    },
    location: {
        type: String
    },
    category: {
        type: String,
        required: true,
        index: true,
        enum: ['hackathon', 'internship', 'coding_contest']
    },
    source: {
        type: String,
        default: 'manual'
    },
    registrationLink: {
        type: String
    },
    approved : {
          type : Boolean ,
          default : false
    },
}, {timestamps : true})

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);