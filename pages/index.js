import Head from 'next/head'
import Message from '../components/Message'
import {db} from "../utils/firebase";
import { useEffect,useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';

export default function Home() {

  //create state with all posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async()=>{
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(()=>{
    getPosts();
  },[]);

  return (
    <div className='mx-4'>
      <Head>
        <title>PnvGram</title>
        <meta name="description" content="Social Media App by PNV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=' my-12 text-lg font-medium'>
        <h2 className=''>See what other people are saying...</h2>
        {
          allPosts.map((post)=>(
            <Message key={post.id} {...post}>
            <Link href={{pathname:`/${post.id}`,query:{...post}}}>
              <button>Comments</button>
            </Link>
            </Message>
          ))
        }
      </div>

    </div>
  )
}
