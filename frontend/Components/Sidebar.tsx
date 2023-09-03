'use client'

import React from 'react'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { useCollection } from 'react-firebase-hooks/firestore'
import { query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { database } from '../firebase';
import Row from './Row';

function Sidebar() {

    const [snapshot] = useCollection(query(collection(database, "searches"), orderBy("start_eta", "desc")));

    return (
    <div className='p-2 md:p-10 py-6 overflow-y-auto'>
        <div className='flex flex-col items-center justify-center mb-10'>
            <GlobeAltIcon className='h-16 w-16 md:h-24 md:w-24 text-green-200'/>

            <div className='hidden md:inline text-emerald-400 text-bold text-center'>
                <h1 className='text-3xl'>
                    ScrapeZon
                </h1>
                <h1 className='text-xs'>
                    Unlock Insights with this Amazon Web Scraper
                </h1>
            </div>
        </div>

        <div className='flex flex-col gap-2 py-2 overflow-x-auto'>
            {snapshot?.docs.map((document) => (
                    <Row key={document.id} document={document} />
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar