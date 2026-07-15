import { User, IUser } from "../models/userModel";
import { ApiError } from "../utils/ApiError";
import { hashPassword, comparePassword } from "../utils/passwordUtil";
import { signToken } from "../utils/jwtUtil";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function registerUser(
  input: RegisterInput
): Promise<AuthResult> {
  const { name, email, password } = input;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email is already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user: IUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken({ userId: user._id.toString() });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const { email, password } = input;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({ userId: user.id.toString() });

  return {
    token,
    user: {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    },
  };
}