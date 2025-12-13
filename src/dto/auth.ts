export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    responseStatus: number;
    userId: string;
    name: string;
    token: string;
  };

  export type SignupRequest = {
    email: string;
    password: string;
  };

  export type SignupResponse = {
    responseStatus: number;
  };

  export type PasswordResetRequestRequest = {
    email: string
  };

  export type PasswordResetRequestResponse = {
    responseStatus: number;
  };

  export type PasswordResetRequest = {
    password: string
  };

  export type PasswordResetResponse = {
    responseStatus: number;
  };

