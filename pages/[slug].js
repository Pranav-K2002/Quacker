/* eslint-disable @next/next/no-img-element */
import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc, } from "firebase/firestore";

export default function Details() {

    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);

    //submit a message
    const submitMessage = async () => {
        if (!auth.currentUser) return router.push('/auth/login');
        if (!message) {
            toast.error("Don't leave the message empty 😓", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

            return;
        }
        const docRef = doc(db, "posts", routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessage("");
    };

    //get comments
    const getComments = async () => {
        const docRef = doc(db, "posts", routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
      };
    
      useEffect(() => {
        if (!router.isReady) return;
        getComments();
      }, [router.isReady]);

    return (<div>
        <Message
            {...routeData}>
        </Message>
        <div className="my-4 mx-4">
            <div className="flex gap-2">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    value={message}
                    placeholder="Enter a comment..."
                    className="bg-gray-800 rounded-sm text-white w-full text-sm p-2"
                />
                <button
                    onClick={submitMessage}
                    className="bg-cyan-500 rounded-sm px-3 text-white text-sm">
                    Submit
                </button>
            </div>
            <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessage?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2>{message.userName}</h2>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
        </div>

        </div>
    </div>);
} 