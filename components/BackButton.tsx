'use client'
import { useRouter } from "next/navigation"

export default function BackButton({ props }: { props: string }) {
    const router = useRouter();
    
    return (
        <button onClick={() => router.back()}>{props}</button>
    )
}