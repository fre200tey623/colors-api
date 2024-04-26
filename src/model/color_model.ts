import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IColor extends Document {
    name: string;
    hex: string;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

const ColorSchema: Schema<IColor> = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'O nome da cor é obrigatório.'],
    },
    hex: {
      type: String,
      required: [true, "O código hexadecimal da cor é obrigatório."],
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    }
});

const ColorModel: Model<IColor> = mongoose.model<IColor>('Color', ColorSchema);

export default ColorModel;
