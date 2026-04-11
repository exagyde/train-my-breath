import { Suspense } from "react";
import SessionContent from "./content";

export default function SessionPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SessionContent />
        </Suspense>
    );
}