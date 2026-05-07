import mongoose, { Schema } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface UserDocument extends mongoose.Document {
	name: string;
	email: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		role: { type: String, enum: ['admin', 'user'], default: 'user' },
	},
	{
		timestamps: true,
	},
);

export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
