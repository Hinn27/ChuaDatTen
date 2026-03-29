import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register({ email, password }) {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) throw new Error(error.message);
	return data.user;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) throw new Error(error.message);
	// Tạo JWT custom cho backend
	const token = jwt.sign({ id: data.user.id, email: data.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
	return { user: data.user, token };
}

export async function getUserById(id) {
	const { data, error } = await supabase.auth.admin.getUserById(id);
	if (error) throw new Error(error.message);
	return data.user;
}
