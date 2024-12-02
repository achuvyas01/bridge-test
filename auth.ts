"use server";
import { cookies } from "next/headers";
import { validateJWT } from "@/lib/authHelpers";

export async function setAuthCookie(token: string, options = {}) {
  (await cookies()).set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...options,
  });
}

export async function getSession() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await validateJWT(token);
    return payload;
  } catch {
    return null;
  }
}

// Define the type for the user
export interface AuthUser {
  id: string;
}

// Define the type for the auth function return value
export type AuthReturnType = {
  user: AuthUser;
} | null;

/**
 * Authenticates the user and retrieves their session.
 * @returns {Promise<AuthReturnType>} The authenticated user's information or null if not authenticated.
 */
export async function auth(): Promise<AuthReturnType> {
  const session = await getSession();

  // Ensure session exists and session.sub is a string
  if (session && typeof session.sub === "string") {
    return {
      user: {
        id: session.sub, // Now we know session.sub is a string
      },
    };
  } else {
    return null; // Return null if the session is not valid or sub is not a string
  }
}

export async function signOut() {
  (await cookies()).set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Immediately expire the cookie
  });
}
