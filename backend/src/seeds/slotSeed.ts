import mongoose from "mongoose";
import { env } from "../config/env";
import { Slot } from "../models/slotModel";


const slotSeedData = [
  {
    title: "General Physician Consultation",
    date: new Date("2026-07-16"),
    startTime: "09:00",
    endTime: "09:30",
    capacity: 3,
    bookedCount: 0,
  },
  {
    title: "Dentist Appointment",
    date: new Date("2026-07-16"),
    startTime: "11:00",
    endTime: "11:30",
    capacity: 1,
    bookedCount: 0,
  },
  {
    title: "Eye Specialist Consultation",
    date: new Date("2026-07-17"),
    startTime: "10:00",
    endTime: "10:30",
    capacity: 2,
    bookedCount: 0,
  },
  {
    title: "Orthopedic Consultation",
    date: new Date("2026-07-17"),
    startTime: "14:00",
    endTime: "14:30",
    capacity: 1,
    bookedCount: 0,
  },
  {
    title: "Cardiologist Consultation",
    date: new Date("2026-07-18"),
    startTime: "09:30",
    endTime: "10:00",
    capacity: 2,
    bookedCount: 0,
  },
  {
    title: "Dermatologist Consultation",
    date: new Date("2026-07-18"),
    startTime: "15:00",
    endTime: "15:30",
    capacity: 3,
    bookedCount: 0,
  },
  {
    title: "Vaccination Slot",
    date: new Date("2026-07-19"),
    startTime: "08:00",
    endTime: "08:15",
    capacity: 5,
    bookedCount: 0,
  },
  {
    title: "Health Checkup",
    date: new Date("2026-07-19"),
    startTime: "12:00",
    endTime: "13:00",
    capacity: 5,
    bookedCount: 0,
  },
  {
    title: "Pediatric Consultation",
    date: new Date("2026-07-20"),
    startTime: "10:30",
    endTime: "11:00",
    capacity: 2,
    bookedCount: 0,
  },
  {
    title: "ENT Specialist Consultation",
    date: new Date("2026-07-20"),
    startTime: "16:00",
    endTime: "16:30",
    capacity: 1,
    bookedCount: 0,
  },
  {
    title: "General Physician Consultation",
    date: new Date("2026-07-21"),
    startTime: "09:00",
    endTime: "09:30",
    capacity: 3,
    bookedCount: 0,
  },
];

async function seedSlots(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connected for seeding");

    await Slot.deleteMany({});
    console.log("Existing Slot documents removed");

    await Slot.insertMany(slotSeedData);
    console.log(`${slotSeedData.length} slots seeded successfully`);
  } catch (error) {
    console.error("Slot seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

seedSlots();