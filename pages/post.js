import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post() {

    let maxTextLen = 300;
    const route = useRouter();

    const routeData = route.query;
    //form state
    const [post, setPost] = useState({ description: "" });

    const [user, loading] = useAuthState(auth);

    //submit post

    const submitPost = async (e) => {
        e.preventDefault();


        //run checks for description
        if (!post.description) {
            toast.error("Description Field is empty 😥", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

            return;
        }
        if (post.description.length > maxTextLen) {
            toast.error("Post exceeds word limit 😔", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

            return;
        }
            if (post?.hasOwnProperty("id")) {
                const docRef = doc(db, "posts", post.id);
                const updatedPost = { ...post, timestamp: serverTimestamp() };
                await updateDoc(docRef, updatedPost);
                return route.push("/");
              } else {
            //make a new post
            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({ description: "" });
            toast.success("Post has been made 🚀", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            return route.push("/")
        }
    }

    //check user
    const checkUser = async () => {
        if (loading) return;
        if (!user) route.push("/auth/login");
        if (routeData.id) {
            setPost({ description: routeData.description, id: routeData.id })
        }
    };

    useEffect(() => {
        checkUser();
    }, [user,loading]);

    return (<div className="my-20 p-12 shadow-lg rounded-md max-w-md mx-auto">

        <form onSubmit={submitPost}>
            <h1 className="text-2xl font-bold">{post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}</h1>
            <div className="py-2">
                <h4 className="text-large font-medium py-2">Description</h4>
                <textarea
                    value={post.description}
                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                    className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm min-h-min" placeholder="Enter text here"></textarea>
                <p className={`text-cyan-500 font-medium text-sm pd-5 ${post.description.length > maxTextLen ? "text-red-500" : ""}`}>
                    {post.description.length}/{maxTextLen}
                </p>
                <button
                    type="submit"
                    className="w-full bg-cyan-500 text-white font-medium rounded-lg">Submit!</button>

            </div>
        </form>
    </div>);
}