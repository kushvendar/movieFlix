import { Client, Databases, ID, Query } from "appwrite"

// 1:55:
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const endPoint = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client('')
    .setEndpoint(endPoint)
    .setProject(PROJECT_ID)

const database = new Databases(client)



export const updateSearchCount = async(searchTerm,movie)=>{

    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.equal('searchTerm',searchTerm)])

        if(result.documents.length>0){
            const docs = result.documents[0]

            await database.updateDocument(DATABASE_ID,COLLECTION_ID,docs.$id,{count:docs.count+1})

        } else {
            if(searchTerm!=''){
                await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
                searchTerm,
                count:1,
                movie_id:movie.id,
                poster_url: `https://image.tmbd.org/t/p/w500${movie.poster_path}`
            })
            }
        }
    } catch (error) {
        console.log(error)
    }

}


export const getTrendingMovie = async()=>{
    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.limit(10),
            Query.orderDesc("count")
        ])

        // console.log(result.documents)
        
     return result.documents
        

    } catch (error) {
        console.log(`${error} something wrong has occured`)
    }
}