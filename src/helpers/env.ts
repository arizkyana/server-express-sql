import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env
  .DATABASE_URL as unknown as string;
export const DATABASE_PORT: number =
  (process.env.DATABASE_PORT as unknown as number) || 5432;
export const DATABASE_USERNAME: string = process.env
  .DATABASE_USERNAME as unknown as string;
export const DATABASE_PASSWORD: string = process.env
  .DATABASE_PASSWORD as unknown as string;
export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET;
export const CLOUDINARY_API_KEY: string = process.env
  .CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET: string = process.env
  .CLOUDINARY_API_SECRET as string;
export const CLOUDINARY_CLOUD_NAME: string = process.env
  .CLOUDINARY_CLOUD_NAME as string;
