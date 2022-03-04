import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

if (admin.apps.length === 0) {
  initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT!)
    ),
  });
}

export { admin };
