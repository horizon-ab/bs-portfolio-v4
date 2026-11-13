import Link from "next/link";

export default function Tidbit({ name, date, description, link }: {name: string, date: string, description: string, link: string}) {
    return (
        <div className="flex flex-col gap-5">
            <div>{name}</div>
            <div>{date}</div>
            <div>{description}</div>
            {link ? <Link href={link} target="_blank" rel="noopener noreferrer">Link</Link> : null}
        </div>
    );
}