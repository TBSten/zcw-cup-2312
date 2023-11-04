import { QuerySnapshot } from "@google-cloud/firestore"

export const snapshotToData = <Document>(snapshot: QuerySnapshot<Document>) =>
    snapshot.docs.map(d => d.data())
