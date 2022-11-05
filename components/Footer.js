import Link from "next/link";

export default function Footer() {

    return (<div className="dark:bg-slate-900 pb-50">
        <div className="flex gap-5 text-lg p-3 justify-between">
            <div className="flex-row">
                <div className="dark:text-white">
                    <h2 className="font-bold text">My Account</h2>
                    <ul className="text-sm">
                        <li>
                        <Link href={"/dashboard"}>Dashboard
                        </Link>
                        </li>
                        <li><Link href={"/post"}>Post</Link></li>
                    </ul>

                </div>
            </div>
            <div className="max-w-sm dark:text-white ">
                <h2>Sign-up to our news letter 📰</h2>
                <form className=" text-sm py-2">
                    <input className="px-2" type="text" placeholder="Enter email id 📧"></input>
                </form>
            </div>
        </div>
        <div className="flex justify-center gap-3 dark:text-white">                   
                        <a href='https://www.instagram.com' className="fa fa-instagram"/>                          
                        <a href='https://www.twitter.com' className="fa fa-twitter"/>
                        <a href='https://www.facebook.com' className="fa fa-facebook"/>                 
                        <a href='https://www.linkedin.com/in/pranav-k-1487071b4/' className="fa fa-linkedin"/>
                        <a href='https://github.com/Pranav-K2002' className="fa fa-github"/>
                </div>
        <div className="flex justify-center dark:text-white py-3">
            <h3 className="">Copyright Pnv 2022 ©</h3>
        </div>
    </div>
    );
}