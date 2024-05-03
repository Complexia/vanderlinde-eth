import AuthButton from "./AuthButton"





import Link from "next/link";


const Navbar = ({ user }) => {

    return (

        <nav className="w-full flex justify-center">
            <div className="w-screen flex justify-between items-center p-3 ml-4 text-sm">

                <Link href="/" className="flex">
                    <span className="cursor-pointer font-bold text-2xl">
                        Vanderlinde
                    </span>
                </Link>
                <div className="flex flex-row space-x-2">



                    {user ? (
                        <div className="flex flex-row space-x-4">
                            <div>
                                <Link href="/register">
                                    <button className="btn btn-primary">Register Project</button>
                                </Link>

                            </div>

                        </div>
                    ) : (
                        <div>bob</div>

                    )}





                </div>
            </div>
        </nav>

    );
}

export default Navbar