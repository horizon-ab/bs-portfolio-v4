'use client'
import { useRouter } from "next/navigation"

export default function BackButton({ props }: { props: string }) {
    const router = useRouter();
    
    return (
        <div className="back-button-container">
            <button onClick={() => router.back()} className="back-button-box">
                 <div className="back-button-icon" />
            </button>
        </div>
    )
}