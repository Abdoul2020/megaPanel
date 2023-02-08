import { Branch } from "../../../types/Branch.entity";
import { Firm } from "../../../types/Firm.entity";

export interface AuthExpertRegisterDto {
  expert_name?: string;
  expert_surname?: string;
  expert_company: string;
  expert_branch?: Branch[];
  expert_email?: string;
  expert_password?: string;
  expert_retype_password?: string;
  expert_reference_from?: string;
}
