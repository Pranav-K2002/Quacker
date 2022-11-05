import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({children}) {
    return(
        <div className="md:max-w-2x1 md:mx-auto font-poppins dark:bg-slate-800">
        <Nav/>
        <main>{children}</main>
        <Footer/>
        </div>
    );
}