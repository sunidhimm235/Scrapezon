'use client'

import { database } from '../../../firebase';
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import Results from '../../../Components/Results';
import { useRouter } from "next/navigation";

type Props = {
    params: {
        id: string
    };
};

function search({params: { id }}: Props) {

    const [snapshot, loading] = useDocument(doc(database, "searches", id));
    const router = useRouter();

    const handleDelete = () => {
        deleteDoc(doc(database, "searches", id));
        router.push("/");
    };

    if (loading) return (
        <div className='text-center p-10 animate-pulse m-auto flex flex-row justify-center items-center'>
            <svg className='animate-spin h-5 w-5 bg-emerald-400' viewBox="0 0 24 24"></svg>
            <h1 className='p-10 text-xl text-emerald-400' >
                Loading...
            </h1>
            {/* {deleteButton} */}
        </div>
    );

    const deleteButtonText = (
        <button
          className="bg-red-400 text-black px-4 py-2 rounded-lg"
          onClick={handleDelete}
        >
          Delete Search
        </button>
    );

    if (!snapshot?.exists()) return;

    if (snapshot.data()?.status === "pending") return (
        <div className='flex flex-col gap-y-5 py-10 items-center justify-between'>
            <p className='text-emerald-400 animate-pulse text-center'>Receiving results from the Amazon...</p>
        </div>
    );

    console.log(JSON.stringify(snapshot.data()?.search));

    const { query } = snapshot.data().search;
    console.log(query);

    return (
        <div className="py-5">
            <div className="flex items-center justify-between mb-7">
                <div className="flex flex-col md:flex-row gap-x-4">
                    <h1 className="font-bold text-emerald-400">
                        Search results for{" "}
                    <span className="text-emerald-400">"{query}"</span>
                    </h1>
                    <p className="text-gray-300 text-md">
                    {snapshot.data()?.results?.length > 0 &&
                        `${snapshot.data()?.results?.length} results found`}
                    </p>
                </div>

                {deleteButtonText}
            </div>
            
            <div className='m-auto'>
                {snapshot.data()?.results?.length > 0 && (
                    <Results results={snapshot.data()?.results} />
                )}
            </div>
        </div>
    )
}

export default search