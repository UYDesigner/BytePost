import conf from "../conf/conf";
import { Client, Databases,  Query, type Models } from "appwrite";
import type { AppwritePost, Post } from "../types/post";


export class DatabasesService {

    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client)
    }
    // create document 
    async createPost(post: Post): Promise<Models.Document | string> {

        try {
            if (await this.getPostById(post.slug)) {
                return "Post already exists";
            }
            else {
                const result = await this.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    post.slug,
                    post

                )

                return result
            }

        } catch (error) {
            console.log("Failed to create a new post", error)
            throw error
        }
    }

    // Get document
    async getPostById(slug: string): Promise<Models.Document | null> {
        try {
            const result = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("slug", slug)]
            );

            if (result.total > 0) {
                return result.documents[0];
            }

            return null;
        } catch (error) {
            console.log("Failed to fetch post by slug");
            throw error;
        }
    }



    async getAllPosts(queries = [Query.equal("status", "active")]): Promise<AppwritePost[]> {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            return response.documents as AppwritePost[];

        } catch (error) {
            console.log("Failed to fetch all posts")
            throw error
        }
    }

    // async updatePostBySlug(slug: string, post: Post): Promise<Models.Document> {
    //     try {
    //         const res = await this.database.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             [Query.equal("slug", slug)]
    //         );

    //         if (res.documents.length === 0) {
    //             throw new Error("Post not found");
    //         }

    //         const docId = res.documents[0].$id;

    //         return await this.database.updateDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             docId,
    //             post
    //         );
    //     } catch (error) {
    //         console.log("Failed to update post:", error);
    //         throw error;
    //     }
    // }


    async updatePost(slug: string, post: Post): Promise<Models.Document> {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                post
            )
        } catch (error) {
            console.log("faliled to update")
            throw error
        }
    }

    async deletePostById(id: string): Promise<{ success: boolean; message: string }> {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return { success: true, message: "Deleted Successfully" };
        } catch (error) {
            console.log("Failed to delete:", error);
            return { success: false, message: "Failed to delete" };
        }
    }

    async getUserById(userId: string) {
        try {
            const res = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("userId", userId)]
            );

            if (res.total > 0) {
                return res.documents[0]; // Return the first matching user
            }

            return null;
        } catch (error) {
            console.error("Failed to get user by ID", error);
            return null;
        }
    }



}
const databaseService = new DatabasesService();


export default databaseService

