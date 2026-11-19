import Tidbit from "./Tidbit";

interface HexagonStyles extends React.CSSProperties {
	'--x-coord'?: number,
	'--y-coord'?: number,
    '--offset-multiplier'?: number,
}


interface HexagonProps {
    content: JSONContent;
}

export interface JSONContent {
    section: string;
    items: JSONTidbit[];
    rows: number;
    columns: number;
}

export interface JSONTidbit {
    name: string;
    date: string;
    description: string;
    link: string;
}

export default function Hexagons({ content }: HexagonProps) {

    const num_rows = content.rows;
    const num_columns = content.columns; /* Make the same as in globals.css */

    const total_width = (3 * num_columns + 1) / 2;
    const hex_width_fraction = 2 / total_width;
    const hex_height_fraction = hex_width_fraction / 1.1547;

    const grid_aspect_ratio = 1 / ((num_rows + 0.5) * hex_height_fraction);

    return (
        <div className="w-full border-[3px] border-[var(--water)]">
            <div style={{
                    containerType: 'inline-size',
                    aspectRatio: grid_aspect_ratio,
                }}
                className="relative w-full overflow-hidden"
            >
            {[...Array((num_rows + 1) * num_columns)].map((_, index) => {

                const x_ind = index % num_columns;
                const y_ind = Math.floor(index / num_columns);

                // Extra row: only render even columns (the half-hexagons at the bottom)
                if (y_ind === num_rows && x_ind % 2 === 1) return null;

                
                const x = x_ind * (3/2) / total_width;
                const y = y_ind * hex_height_fraction;

                let offset_multiplier;
                if (x_ind % 2 == 1) {
                    offset_multiplier = 1
                } else {
                    offset_multiplier = 0
                }

                const styles: HexagonStyles = {
                    '--x-coord' : x,
	                '--y-coord' : y,
                    '--offset-multiplier' : offset_multiplier
                }

                const tbs = content.items;

                const tb = index < tbs.length ? tbs[index] : null;
                const name = tb ? tb.name : "";
                const date = tb ? tb.date : "";
                const description = tb ? tb.description : "";
                const link = tb ? tb.link : "";

                return (
                        <div key={index} className="hexagon" style={styles}>
                            <div className="hexagon-inside">
                                <Tidbit name={name} date={date} description={description} link={link} />
                            </div>
                        </div>
                );
                
            })}
            </div>
        </div>
    );
}