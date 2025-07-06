require('dotenv').config({ path: './.env.local' });


/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: './utils/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL, // ✅ use `url` instead of `connectionString`
  },
};
