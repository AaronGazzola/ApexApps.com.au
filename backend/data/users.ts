import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
    isAdmin: true,
    isVerified: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
    isVerified: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
    isVerified: true,
  },
  {
    name: 'unverified user',
    email: 'user@example.com',
    password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
  },
];

export default users;
