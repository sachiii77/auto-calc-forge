
import { Timestamp } from "firebase/firestore";

export interface Calculator {
    id: string;
    templateId?: string;
    name: string;
    description: string;
    createdAt: Timestamp;
    uses: number;
}
