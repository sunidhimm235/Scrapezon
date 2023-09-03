'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'

function Header() {

    // const inputRef = useRef<HTMLInputElement>(null);
    const [query,setQuery] = useState("");
    const router = useRouter();

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(query);

        if (query === "") return;

        // if (!query) return;

        // if (inputRef.current?.value) {
        //     inputRef.current.value = "";
        // }

        try {
            const response = await fetch('/activateScraper', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            const { collection_id, start_eta } = await response.json();

            router.push(`/search/${collection_id}`);

        } catch (error) {

        }
    }

    return (
    <header>
        <form className='flex items-center space-x-5 justify-center rounded-full py-2 px-4 max-w-md mx-auto bg-green-50 text-emerald-600'
        onSubmit={handleSearch}
        >
            <input type='text' placeholder='SEARCH...' onChange={(e) => {
                setQuery(e.target.value);
            }} className='flex-1 outline-none bg-transparent placeholder:text-emerald-600'/>
            <button hidden>SEARCH</button>
            <MagnifyingGlassIcon className='h-6 w-6' />
        </form>
    </header>
    )
}

export default Header