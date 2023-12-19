import { loginSchema } from "@/lib/validators/login";
import { CryptographyService } from "./cryptography";
import { UsersService } from "./users";
import { ValidationService } from "./validation";
import { User } from "@prisma/client";
import { signupSchema } from "@/lib/validators/signup";
import { HttpService } from "./http";
import { NextRequestWithAuth } from "next-auth/middleware";
import { GoogleProfile } from "next-auth/providers/google";
import { GithubProfile } from "next-auth/providers/github";
import { UserToCreate } from "./auth.types";

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

    const userExistsWithEmail = await this.usersService.findByEmail(credentials!.email);

    if (userExistsWithEmail) {
      console.error(`User with email "${credentials!.email}" already exists`);
      return null;
    }

    const userToCreate: UserToCreate = {
      email: credentials!.email,
      password: await this.cryptographyService.hashString(credentials!.password),
      googleId: null,
      githubId: null,
      firstName: null,
      lastName: null,
      picture: null,
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

  async validateRequest(req: NextRequestWithAuth): Promise<"OK" | null> {
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

  async authenticateWithGoogle(profile: GoogleProfile): Promise<Pick<User, "id" | "email"> | null> {
    const userExistsWithGoogleId = await this.usersService.findByGoogleId(profile.sub);

    if (userExistsWithGoogleId) {
      return {
        id: userExistsWithGoogleId.id,
        email: userExistsWithGoogleId.email,
      };
    }

    // For account linking --> when a user has already signed up with a different authentication provider
    // This keeps up the unique email constraint
    const existingUserWithEmail = await this.usersService.findByEmail(profile.email || "");

    if (existingUserWithEmail) {
      const updatedUser = await this.usersService.update(existingUserWithEmail.id, { googleId: profile.id });

      if (!updatedUser) {
        return null;
      }
      
      return {
        id: updatedUser.id!,
        email: updatedUser.email!,
      }
    }

    const userToCreate: UserToCreate = {
      email: profile.email,
      googleId: profile.sub,
      githubId: null,
      password: null,
      firstName: profile.given_name,
      lastName: profile.family_name,
      picture: profile.picture,
    };

    const user = await this.usersService.create(userToCreate);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async authenticateWithGithub(profile: GithubProfile): Promise<Pick<User, "id" | "email"> | null> {
    const existingUserWithGithubId = await this.usersService.findByGithubId(String(profile.id));

    if (existingUserWithGithubId) {
      return {
        id: existingUserWithGithubId.id,
        email: existingUserWithGithubId.email,
      };
    }

    // For account linking --> when a user has already signed up with a different authentication provider
    // This keeps up the unique email constraint
    const existingUserWithEmail = await this.usersService.findByEmail(profile.email || "");

    if (existingUserWithEmail) {
      const updatedUser = await this.usersService.update(existingUserWithEmail.id, { githubId: String(profile.id) });

      if (!updatedUser) {
        return null;
      }
      
      return {
        id: updatedUser.id!,
        email: updatedUser.email!,
      }
    }

    const userToCreate: UserToCreate = {
      email: profile.email || "",
      password: null,
      googleId: null,
      githubId: String(profile.id),
      firstName: profile.name,
      lastName: "",
      picture: profile.avatar_url,
    }

    const user = await this.usersService.create(userToCreate);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}