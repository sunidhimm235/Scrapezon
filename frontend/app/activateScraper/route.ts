// import { NextApiRequest } from "next";

// export async function POST(req: Request) {
//     console.log("Submitting to scrapezon... >>> :", req.body);
// }

import { NextResponse } from "next/server";
import { db } from '../../firebaseAdmin';

type Data = {
    collection_id: string;
    start_eta: number;
};

type Error = {
    error: string;
};

export async function POST(
    req: Request
){
    try {
        const search = await req.json();
        const look_for = search.query;
        console.log("Searching what :", look_for);

        const response = await fetch(`https://api.brightdata.com/dca/trigger?collector=c_llxvigq116gpocsbjk&queue_next=1`, 
        { 
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: look_for,
            }),
        });

        const data = await response.json();
        console.log("Response from BrightData :", data);

        const { collection_id, start_eta } = data;

        await db.collection('searches').doc(collection_id).set({
            search,
            start_eta,
            status: "building",
            updatedAt: start_eta,
        });

        console.log("Sending response to client...");
        return NextResponse.json({ collection_id, start_eta });
    } catch (error: any) {
        console.log("Error :", error);
        return NextResponse.json({ error: error.message });
    }
}