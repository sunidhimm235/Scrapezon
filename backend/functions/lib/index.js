"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onScrapperComplete = void 0;
const functions = require("firebase-functions");
const firebaseAdmin_1 = require("./firebaseAdmin");
// import * as admin from "firebase-admin";
// const fetchResults: any = async (id: string) => {
//   const api_key = process.env.BRIGHTDATA_API_KEY;
//   const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${api_key}`,
//     },
//   });
//   const data = await res.json();
//   console.log("DEBUG 1 GATE >>>", data.status);
//   if (data.status === "building" || data.status === "collecting") {
//     console.log("NOT COMPLETE YET, TRYING AGAIN IN 5 SECONDS");
//     return fetchResults(id);
//   }
//   console.log("DEBUG 2 ><><>");
//   return data;
// };

const fetchResults = async (id) => {
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

exports.onScrapperComplete = functions.https.onRequest(async (request, response) => {
    // console.log("SCRAPE COMPLETE >>> : ", request.body);
    // const { success, id } = request.body;
    // if (!success) {
    //     await firebaseAdmin_1.adminDb.collection("searches").doc(id).set({
    //         status: "error",
    //         //   updatedAt: admin.firestore.Timestamp.now(),
    //     }, { merge: true });
    //     response.set(500).send("Error while scraping");
    // }
    // // const data = await fetchResults(id);
    // // await adminDb.collection("searches").doc(id).set(
    // //   {
    // //     status: "complete",
    // //     updatedAt: admin.firestore.Timestamp.now(),
    // //     results: data,
    // //   },
    // //   {
    // //     merge: true,
    // //   }
    // // );
    // // console.log("<><><><><>< FULL CIRCLE ><><><><><><>");
    // response.send("Hello from Firebase!");

    console.log("SCRAPE COMPLETE: ", request.body);
    console.log("DEBUG 0");
    const { success, id, finished } = request.body;
    console.log("id: ", id);
    if (!success) {
        await firebaseAdmin_1.adminDb.collection("searches").doc(id).set({
            status: "error",
            updatedAt: finished,
        }, {
            merge: true
        });
        response.set(500).send("Error while scraping :(");
    }
    const data = await fetchResults(id);
    await firebaseAdmin_1.adminDb.collection("searches").doc(id).set({
        status: "complete",
        updatedAt: finished,
        results: data,
    }, {
        merge: true,
    });
    console.log("-----------FULL CIRCLE-----------");
    response.send("Scrape complete!");

});
// https://366a-208-64-158-249.ngrok-free.app/scrapezon/us-central1/onScrapperComplete
//# sourceMappingURL=index.js.map