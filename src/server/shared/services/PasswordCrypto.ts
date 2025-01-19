// import bcrypt from "bcrypt";

// export class PasswordCrypto {
//   private static readonly saltRounds = 10;

//   static async hashPassword(password: string): Promise<string> {
//     try {
//       const hashed = await bcrypt.hash(password, this.saltRounds);
//       console.log(`PasswordCrypto.hashPassword: ${hashed}`); // Add logging
//       return hashed;
//     } catch (error) {
//       console.error("Error hashing password:", error);
//       throw error;
//     }
//   }

//   static async verifyPassword(
//     password: string,
//     hashedPassword: string
//   ): Promise<boolean> {
//     try {
//       const match = await bcrypt.compare(password, hashedPassword);
//       console.log(`PasswordCrypto.verifyPassword: ${match}`); // Add logging
//       return match;
//     } catch (error) {
//       console.error("Error verifying password:", error);
//       throw error;
//     }
//   }
// }
import { genSalt, hash, compare } from "bcryptjs";

const SALT_ROUNDS = 8;

export const PasswordCrypto = {
  /**
   * Hash a password using bcryptjs
   * @param password The password to hash
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  },

  /**
   * Verify a password against a hashed password
   * @param password The password to verify
   * @param hashedPassword The hashed password to verify against
   */
  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  },
};
