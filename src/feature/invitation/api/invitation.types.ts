export type InvitationCreateRequestData = {
  email: string;
  url: string;
};

export type InvitationValidateRequestData = {
  code: string;
};

export type InvitationValidateResponse = {
  farmId: string;
};
