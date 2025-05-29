import conf from "../conf/conf";
import { Client, Account, ID, type Models } from "appwrite";
import type { LoginData, User } from "../types/user";
import databaseService from "./databaseServices";


export class AuthService {
    client = new Client();
    account: Account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount(user: User): Promise<Models.Session | undefined> {
        try {
            // Step 1: Create account
            await this.account.create(ID.unique(), user.email, user.password, user.name);

            // Step 2: Log in the user (to create session)
            const session = await this.logIn({ email: user.email, password: user.password });

            // Step 3: Now get current user info (session exists now)
            const userData = await this.getCurrentUser();

            if (userData) {
                // console.log("User data fetched:", userData);

                // Step 4: Create user profile document in database
                await databaseService.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteUserCollectionId,
                    userData.$id,
                    {
                        userId: userData.$id,
                        name: user.name,
                        email: user.email
                    }
                );
                console.log("User info saved in DB.");
            }

            return session;
        } catch (error) {
            throw error;
        }
    }


    async logIn(user: LoginData): Promise<Models.Session | undefined> {
        try {
            return await this.account.createEmailPasswordSession(user.email, user.password);


        } catch (error: any) {
            throw new Error(error?.message || "Login failed");
        }
    }

    async getCurrentUser(): Promise<Models.User<any> | null> {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("getCurrentUser error hai", error);
            return null;
        }
    }



    async logOut(): Promise<void> {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
