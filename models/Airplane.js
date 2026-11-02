import mongoose from "mongoose";

const aircraftSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Номер самолета обязателен!"],
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    required: [true, "Марка обязательна!"],
    trim: true
  },
  model: {
    type: String,
    required: [true, "Модель обязательна!"],
    trim: true
  },
  year: {
    type: Number,
    required: [true, "Год выпуска обязателен!"],
    min: 1950,
    max: 2026
  },
  hours: {
    type: Number,
    required: [true, "Налет часов обязателен!"],
    min: 0
  },
  price: {
    type: Number,
    required: [true, "Цена обязательна!"],
    min: 0
  },
  image: {
    type: String
  }
});

export default mongoose.model("Airplane", aircraftSchema);
