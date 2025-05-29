const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL as string,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID as string,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID as string,
  tinyApi: import.meta.env.VITE_TINY_API as string,
  appwriteUserCollectionId : import.meta.env.VITE_APPWRITE_USERCOLLECTION_ID as string,
  
};

if (!conf.appwriteUrl || !conf.appwriteProjectId) {
  throw new Error("Missing required Appwrite configuration in .env");
}


export default conf;
