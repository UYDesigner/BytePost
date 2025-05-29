import conf from "../conf/conf";
import { Client, ID, Storage, type Models } from "appwrite";

export class BucketServices {
    client = new Client();
    bucket: Storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    // Upload file
    async uploadFile(file: File): Promise<Models.File> {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("❌ Failed to upload:", error);
            throw error;
        }
    }

    // Get file details
    async getFile(fileId: string): Promise<Models.File> {
        try {
            return await this.bucket.getFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("❌ Failed to fetch file:", error);
            throw error;
        }
    }

    // Delete file
    async deleteFile(fileId: string): Promise<{ success: boolean; message: string }> {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return { success: true, message: "Deleted Successfully" };
        } catch (error) {
            console.log("❌ Failed to delete file:", error);

            return { success: false, message: "Failed to delete" };
        }
    }
    
    getFilePreView(fileId : string)
    {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const bucketServices = new BucketServices();
export default bucketServices;
