export interface AuthClientUpdatePasswordDto {
  client_old_password?: string;
  client_new_password?: string;
  client_new_retype_password?: string;
}
