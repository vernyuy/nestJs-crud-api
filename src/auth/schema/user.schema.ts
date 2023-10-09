import * as mongoose from 'mongoose';

export const UserSchemas = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  password: String,
});
