import dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_TIME_FORMAT_PATTERN = 'do MMM yyyy HH:mm:ss';
export const DEFAULT_TIME_FORMAT_PATTERN_SHORT = 'do MMMM yyyy';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
