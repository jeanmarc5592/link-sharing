import { loginSchema } from "@/lib/validators/login";
import { CryptographyService } from "./cryptography";
import { UsersService } from "./users";
import { ValidationService } from "./validation";

export class AuthService {
  private usersService: UsersService;
  
  private cryptographyService: CryptographyService;

  private validationService: ValidationService;

  constructor() {
    this.usersService = new UsersService();
    this.cryptographyService = new CryptographyService();
    this.validationService = new ValidationService();
  }

  async login(credentials: Record<"email" | "password", string> | undefined) {
    const isValid = this.validationService.validateSchema(loginSchema, credentials);

    if (!isValid) {
      return null;
    }

    const user = await this.usersService.findByEmail(credentials!.email);

    if (!user) {
      return null;
    }
    const passwordsMatch = await this.cryptographyService.compareStrings(credentials!.password, user.password);

    if (!passwordsMatch) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}