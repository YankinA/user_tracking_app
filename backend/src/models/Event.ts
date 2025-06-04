import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  tags: { type: [String], default: [] },
  url: { type: String, required: true },
  title: { type: String, required: true },
  ts: { type: Number, required: true },
});

export const Event = mongoose.model("event", eventSchema, "tracks");
