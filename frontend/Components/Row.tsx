'use client'

import React, { useEffect, useState } from 'react'
import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '../firebase';
import Spinner from "react-spinkit";

type Props = {
    document: DocumentData;
}

function Row({document}: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const [ active, setActive ] = useState(false);

    useEffect(() => {

        if (!pathname) return;
        setActive(pathname.includes(document.id));

    }, [pathname, doc])

    const handleDelete = () => {
        deleteDoc(doc(database, "searches", document.id));
        router.push("/");
    };

    const deleteButtonCross = (
        <button
          className="bg-red-400 text-black px-2 py-2 rounded-lg"
          onClick={handleDelete}
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        </button>
    );

    return (
        <li 
            onClick={() => router.push(`/search/${document.id}`)}
            className = {'flex md:flex-row flex-col justify-between p-4 cursor-pointer hover:bg-gray-700 rounded-lg hover:shadow-md' + 
            (active ? ' bg-gray-700 shadow-md' : '') + 
            ' transition duration-200 ease-in-out' }
        >
            <div className='flex flex-col justify-center'>
                <p className='text-sm font-bold text-emerald-400'>{document.data().search.query}</p>
                <p className='text-sm text-gray-400'>{document.data().search.category}</p>
                {document.data().status === "pending" && (
                    <p className='text-md text-gray-400'>Receiving results from the Amazon...</p>    
                )}
            </div>

            <span>
                {document.data().status === "pending" ? (
                    <Spinner name="triangle-skew-spin" color="green" fadeIn="none" />    
                ) : (
                    <p className='text-xs text-gray-400 py-1'>{(document.data().results?.length == null) ? 0 : document.data().results?.length} results</p>
                )}
            </span>

            {deleteButtonCross}
        </li>
    )
}

export default Row