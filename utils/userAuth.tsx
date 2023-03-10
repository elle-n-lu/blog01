import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"



export const userAuth = () =>{
    const {data, loading} = useMeQuery()
    const router = useRouter()
    // console.log('router',router)
    
    useEffect(()=>{
        
        if(!loading && !data?.me){
            
            {router.replace("/login?next=" + router.pathname)}
        }
        
    },[data, loading, router])
} 

