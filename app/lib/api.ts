import { SignUpFormData } from "./schemas/auth.schema";
import { LoginFormData } from "./schemas/login.schema";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



export const authApi = {
  signUp: async (data: SignUpFormData) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
    return response.json();
  },
  signIn: async (data: LoginFormData) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
    return response.json();
  },

  getUser: async (id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
},
};
