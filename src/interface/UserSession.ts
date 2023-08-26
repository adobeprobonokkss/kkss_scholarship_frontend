export const SESSION_STORAGE_USERS_KEY = "usersInfo";

interface user {
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface userSession {
  valid: boolean;
  expired: boolean;
  decoded: user | null;
}

export const defaultUserSession: userSession = {
  valid: false,
  expired: false,
  decoded: { name: null, email: null, picture: null }
};
