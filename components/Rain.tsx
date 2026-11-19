interface RainStyles extends React.CSSProperties {
	'--index-offset'?: number,
	'--rain-lines'?: number,
	'--right-offset'?: number,
	'--cut-one'?: number,
	'--cut-two'?: number,
}

interface GroundStyles extends React.CSSProperties {
	'--ground-offset'?: number,
	'--ground-cut'?: number,
}

/* Number of rain lines on each side*/
const rain_lines: number = 4;
/* Make sure this is the same value as --rain-gap in globals.css */
const rain_gap: number = 0.15
const min_rain_gap: number = 0.1
/* Make sure this is the same value as --ground-lines in globals.css */
const ground_lines: number = 5;
/* Make sure this is the same value as --ground-spacing in globals.css */
const ground_spacing: number = 25;
/* Trying out something different here... */
const ground_cut: number = 0.2;

function generate_cuts() {
	const choice = Math.random();

	let cut_one, cut_two;
	if (choice < 0.5) {
		cut_one = Math.random() * (1 - rain_gap - min_rain_gap);
		cut_two = 1;
	} else {
		cut_one = Math.random() * (0.5 - rain_gap - min_rain_gap);
		cut_two = Math.random() * (0.5 - rain_gap - min_rain_gap) + 0.5;
	}

	return [cut_one, cut_two];
}

export default function Rain() {

	return (
		<div className="rain-wrapper flex flex-col h-dvh m-10 gap-10">
			<div className="relative flex-5">
				<div className="rain-cover">
					<div className="rain-cover-left" />
					<div className="rain-cover-right" />
					<div className="rain-border-left" />
					<div className="rain-border-right" />
				</div>
				<div className="rain-drops-left">
					{[...Array(rain_lines)].map((_, index) => {

							const [cut_one, cut_two] = generate_cuts();

							const styles: RainStyles = {
								'--index-offset' : index + 1,
								'--rain-lines' : rain_lines,
								'--right-offset' : 0,
								'--cut-one' : cut_one,
								'--cut-two' : cut_two,
							};
							return (<div key={index + 1} style={styles} className="rain-drop" />)
					})}
				</div>
				<div className="rain-drops-right">
					{[...Array(rain_lines)].map((_, index) => {

							const [cut_one, cut_two] = generate_cuts();

							const styles: RainStyles = {
								'--index-offset' : rain_lines - index,
								'--rain-lines' : rain_lines,
								'--right-offset' : 1,
								'--cut-one' : cut_one,
								'--cut-two' : cut_two,
							};
							return (<div key={index + 1} style={styles} className="rain-drop" />)
					})}
				</div>
				<div className="rain-text">
					<div className="rain-text-catch">"It all drips down into the sea"</div>
					<div className="rain-text-site">baysalt.dev</div>
				</div>
			</div>
			<div className="ground-cover">
				{[...Array(ground_lines)].map((_, index) => {

					const styles: GroundStyles = {
						'--ground-offset' : index * ground_spacing,
						'--ground-cut' : index * ground_cut,
					}

					return (<div key={index + 1} style={styles} className="ground-line" />)
				})}
			</div>
		</div>
	);
}
