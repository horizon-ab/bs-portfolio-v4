import path from "node:path"
import * as fs from "node:fs/promises"

import Hexagons, { type JSONContent } from "@/components/Hexagons";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
    const filePaths = await fs.readdir(path.join(process.cwd(), "content"))
    
    return filePaths
        .filter((fp) => fp.endsWith(".json"))
        .map((fp) => ({ slug: path.parse(fp).name }));
}

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: slug
    }
}

export default async function HexagonPage({
    params,
}: {
    params: Promise<{ slug: string}>;
}) {

    const { slug } = await params;

    const data = await fs.readFile(path.join(process.cwd(), "content", `${slug}.json`), 'utf-8')
    const jsonContent: JSONContent = JSON.parse(data)

    return (
        <div className="hexagon-page">
            <div className="hp-title-box">
                <BackButton props="Back" />
                <h1 className="hp-title">{jsonContent.section}</h1>
                <div />
            </div>
            <Hexagons content={jsonContent} />
        </div>
    )
}