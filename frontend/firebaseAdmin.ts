import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const serviceAccount = require('./scrapezon-firebase-adminsdk-2zk9y-dd227cfd41.json');

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

export { db };