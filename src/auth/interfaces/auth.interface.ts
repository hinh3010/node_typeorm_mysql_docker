import { RoleType } from "../../user/user.dto";

export interface PayloadToken {
  role: RoleType;
  sub: string;
}
