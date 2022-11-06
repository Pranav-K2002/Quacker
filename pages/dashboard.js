/* eslint-disable react-hooks/rules-of-hooks */
import { auth,db } from "../utils/firebase";
import { useRouter } from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/Message";
import {BsTrashFill} from "react-icons/bs";
import {AiFillEdit} from "react-icons/ai";
import Link from "next/link";



export default function dashboard() {

    const route=useRouter();
    const [user,loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
    
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
      };

      //delete post
      const delPost = async(id)=>{
        const docRef=doc(db,"posts",id)
        await deleteDoc(docRef);
      };

    useEffect(() => {
      getData();
    }, [user,loading])
    

    return (
        <div className="dark:text-white">
            <h1>Your Posts:</h1>
            <div>
                {
                    posts.map((post)=>(
            <Message key={post.id} {...post}>
                    <div className="flex gap-4 my-2">
                        <button
                        onClick={()=>delPost(post.id)}
                        className=" rounded-sm px-2  text-red-500 flex items-center justify-items-center gap-1"><BsTrashFill/>Delete</button>
                        <Link href={{pathname:"/post",query:post}}>
                        <button className=" rounded-sm px-2 text-cyan-500 flex items-center justify-items-center gap-1"><AiFillEdit/>Edit</button>
                        </Link>
                    </div>
            </Message>
          ))
                }
            </div>
            <button onClick={()=> auth.signOut()}
            className="py-2 px-4 text-sm bg-red-500 text-white rounded-lg font-medium ml-8">Sign Out
            </button>
        </div>
    );
}   