export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
