//Model for confirmation of email

export interface ConfirmationResponse {
    message: string;
    token: string | null;
    user: {
      user_id: number;
      company_id: number;
    };
  }
  