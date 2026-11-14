import Link from "next/link";

export default function Tidbit({ name, date, description, link }: {name: string, date: string, description: string, link: string}) {
    return (
        <div className="flex flex-col gap-5 p-10 justify-center">
            <div className="flex flex-col gap-1">
                {name ? <div className="text-center text-3xl">{name}</div> : null}
                {date ? <div className="text-center text-base">{date}</div> : null}
            </div>
            {description ? <div className="text-lg">{description}</div> : null}
            {link ? <Link href={link} target="_blank" rel="noopener noreferrer" className="text-center">Link</Link> : null}
        </div>
    );
}