import pool from "../config/db.js";

// Create new user
export const createUser = async (email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (email, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role
  `;
  const values = [email, hashedPassword, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
