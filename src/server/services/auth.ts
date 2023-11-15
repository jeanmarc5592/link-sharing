import { loginSchema } from "@/lib/validators/login";
import { CryptographyService } from "./cryptography";
import { UsersService } from "./users";
import { ValidationService } from "./validation";
import { User } from "@prisma/client";
import { signupSchema } from "@/lib/validators/signup";
import { HttpService } from "./http";

export class AuthService {
  private usersService: UsersService;
  
  private cryptographyService: CryptographyService;

  private validationService: ValidationService;

  private httpService: HttpService;

  constructor() {
    this.usersService = new UsersService();
    this.cryptographyService = new CryptographyService();
    this.validationService = new ValidationService();
    this.httpService = new HttpService();
  }

  async login(credentials: Record<"email" | "password", string> | undefined): Promise<Pick<User, "id" | "email"> | null> {
    const schemaValidation = this.validationService.validateSchema(loginSchema, credentials);

    if (schemaValidation !== "OK") {
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

  async signup(credentials: Record<"email" | "password" | "confirmPassword", string> | undefined): Promise<Pick<User, "id" | "email"> | null> {
    const schemaValidation = this.validationService.validateSchema(signupSchema, credentials);

    if (schemaValidation !== "OK") {
      return null;
    }

    const passwordsAreEqual = this.validationService.validateEquality(credentials!.password, credentials!.confirmPassword);

    if (passwordsAreEqual !== "OK") {
      return null;
    }

    const userExists = await this.usersService.findByEmail(credentials!.email);

    if (userExists) {
      console.error(`User with email "${credentials!.email}" already exists`);
      return null;
    }

    const userToCreate: Pick<User, "email" | "password"> = {
      email: credentials!.email,
      password: await this.cryptographyService.hashString(credentials!.password),
    };

    const user = await this.usersService.create(userToCreate);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    }
  }

  async validateRequest(req: any): Promise<"OK" | null> {
    const token = await this.httpService.extractToken(req);

    if (!token) {
      console.error("No token in request");
      return null;
    }

    const isTokenValid = await this.httpService.validateToken(token);

    if (!isTokenValid) {
      console.error("Token is not valid");
      return null;
    }

    return "OK";
  }
}