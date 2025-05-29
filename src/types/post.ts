import type { Models } from "appwrite";

export interface Post{
    image: any;
    
    title : string,
    slug : string,
    content : string,
    featuredImage : string,
    status : string,
    userId : string
}

export interface AppwritePost extends Models.Document {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}


