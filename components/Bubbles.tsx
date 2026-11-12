interface BubbleStyles extends React.CSSProperties {
	'--x-coord'?: number,
	'--y-coord'?: number
}

const num_bubbles = 4;

const categories = ["Work", "Projects", "Fun", "Contact Me"]

function generate_coords(ind: number, num_bubbles: number) {

	const hup = 1.0 / (3 * num_bubbles)
	const vup = 1.0 / 7

	const x_begin = hup + ind * 3 * hup;
	const x_end = 2 * hup + ind * 3 * hup;

	let y_begin, y_end;

	if (ind % 2 == 0) {

		// From bottom
		y_begin = 2 * vup;
		y_end = 3 * vup;

	} else {

		// From top
		y_begin = 4 * vup;
		y_end = 5 * vup;

	}

	const x = Math.random() * (x_end - x_begin) + x_begin;
	const y = Math.random() * (y_end - y_begin) + y_begin;

	return [x, y]

}
	


export default function Bubbles() {
	return (
		<div className="border-1 relative h-dvh">
			{[...Array(num_bubbles)].map((_, index) => {

				const [x, y] = generate_coords(index, num_bubbles);

				const styles: BubbleStyles = {
					'--x-coord' : x,
					'--y-coord' : y
				}

				return <div key={index} className="bubble" style={styles}>{categories[index]}</div>
			})}
		</div>
	);
}
