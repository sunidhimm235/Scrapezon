import * as functions from "firebase-functions";
import { adminDb } from "../firebaseAdmin";
// import * as admin from "firebase-admin";

const fetchResults: any = async (id: string) => {
  const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
    },
  });

  const data = await res.json();

  console.log("DEBUG 0 GATE : ", data);

  console.log("DEBUG 1 GATE : ", data.status);
  
  if (data.status === "building" || data.status === "collecting") {
    console.log("Did not properly collect data yet. Trying again in 15 seconds...");
    await new Promise(resolve => setTimeout(resolve, 15000)); 
    return fetchResults(id);
  }

  console.log("DEBUG 2");

  return data;
};

export const onScrapperComplete = functions.https.onRequest(
  async (request, response) => {
    console.log("SCRAPE COMPLETE: ", request.body);

    console.log("DEBUG 0");

    const { success, id, finished } = request.body;

    console.log("id: ", id);

    if (!success) {
      await adminDb.collection("searches").doc(id).set(
        {
          status: "error",
          updatedAt: finished,
        },
        { 
            merge: true 
        }
      );
      response.set(500).send("Error while scraping :(");
    }

    const data = await fetchResults(id);

    await adminDb.collection("searches").doc(id).set(
      {
        status: "complete",
        updatedAt: finished,
        results: data,
      },
      {
        merge: true,
      }
    );

    console.log("-----------FULL CIRCLE-----------");
    response.send("Scrape complete!");

  }
);


// https://96d9-208-64-158-249.ngrok-free.app/scrapezon/us-central1/onScrapperComplete