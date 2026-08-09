import { connect } from 'mongoose';

import { env } from '@/env';

const connectDatabase = async () => {
  try {
    const mongoUri = env.MONGO_URI;
    const conn = await connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Database connection failed: ${message}`);
    process.exit(1);
  }
};

export default connectDatabase;
