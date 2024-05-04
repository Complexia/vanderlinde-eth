"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SucessModal = (response) => {
    const [modal, setModal] = useState(true);

    useEffect(() => {

        setModal(true)
    }, []);



    const closeModal = () => {
        console.log("this is model:", modal);
        setModal(false);

    };

    if (!modal) {
        return null; // Don't render anything if modal is not active
    }
    
    return (
        <div>
            {/* @ts-ignore */}
            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Contract hash</h3>
                    <p className="py-4">{response}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
export default SucessModal;
