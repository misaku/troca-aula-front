export interface GovbrAuthUrlResponse {
  url: string;
  state: string;
}

export interface GovbrLoginRequest {
  code: string;
  redirect_uri: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  roles: string[];
}

export interface GovbrLoginResponse {
  token: string;
  user: UserDTO;
  expires_in: number;
}

export interface AuthState {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}