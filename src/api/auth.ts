import type { LoginRequest, LoginResponse, SignupRequest,SignupResponse,PasswordResetRequest,PasswordResetRequestRequest,PasswordResetRequestResponse,PasswordResetResponse } from "../dto/auth";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";



export async function login(req: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (res.status === 401) {
    const msg = await res.text();
    throw new Error(msg || "Invalid email or password");
  }

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  return res.json();
}

export async function signup(req: SignupRequest): Promise<SignupResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    if (res.status === 401) {
        const msg = await res.text();
        throw new Error(msg || "Invalid email or password");
    }

    if (!res.ok) {
        throw new Error(`Signup failed: ${res.status}`);
    }

    return res.json();
}