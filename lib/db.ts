import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

const globalCache = globalThis as typeof globalThis & { mongooseCache?: MongooseCache };

const cache: MongooseCache = globalCache.mongooseCache ?? { conn: null, promise: null };

globalCache.mongooseCache = cache;

export async function connectToDatabase() {
	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI nao configurada.');
	}
	if (cache.conn) {
		return cache.conn;
	}

	if (!cache.promise) {
		cache.promise = mongoose.connect(MONGODB_URI);
	}

	cache.conn = await cache.promise;
	return cache.conn;
}
