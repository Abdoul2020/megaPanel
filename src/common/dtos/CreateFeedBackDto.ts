import { Client } from "../types/Client.entity";
import { Doctor } from "../types/Doctor.entity";

export interface CreateFeedBackDto {
  feedback_client_name: string;
  feedback_client_email: string;
  feedback_client_subject: string;
  feedback_client_message: string;
  feedback_client_client?: Client;
  feedback_client_expert?: Doctor;
}
