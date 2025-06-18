import { Client, Databases } from "appwrite"
import { DatabaseSync } from "node:sqlite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const endPoint = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client('')
    .setEndpoint(endPoint)
    .setProject(PROJECT_ID)

const database = new Databases(client)



export const updateSearchCount = async()=>{

    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.equal('searchTerm',searchTerm)])
    } catch (error) {
        
    }

}