import Link from "next/link";

export default function Tidbit({ name, date, description, link }: {name: string, date: string, description: string, link: string}) {
    return (
        <div className="flex flex-col gap-2 sm:gap-5 p-2 sm:p-10 justify-center">
            <div className="flex flex-col gap-1">
                {name ? <div className="text-center text-base sm:text-2xl md:text-3xl">{name}</div> : null}
                {date ? <div className="text-center text-xs sm:text-sm">{date}</div> : null}
            </div>
            {description ? <div className="text-xs sm:text-sm md:text-base">{description}</div> : null}
            {link ? <Link href={link} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm md-text-base text-center">Link</Link> : null}
        </div>
    );
}