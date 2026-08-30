interface ExtraStyles extends React.CSSProperties {
	'--index-offset'?: number,
	'--rain-lines'?: number,
	'--right-offset'?: number,
}

export default function Rain() {

	/* Number of rain lines on each side*/
	const rain_lines: number = 4;

	return (
		<div className="relative w-screen h-dvh border-1">
			<div className="rain-cover">
				<div className="rain-cover-left" />
				<div className="rain-cover-right" />
				<div className="rain-border-left" />
				<div className="rain-border-right" />
			</div>
			<div className="rain-drops-left">
				{[...Array(rain_lines)].map((_, index) => {
						const styles: ExtraStyles = {
							'--index-offset' : index + 1,
							'--rain-lines' : rain_lines,
							'--right-offset' : 0,
						};
						return (<div key={index + 1} style={styles} className="rain-drop" />)
				})}
			</div>
			<div className="rain-drops-right">
				{[...Array(rain_lines)].map((_, index) => {
						const styles: ExtraStyles = {
							'--index-offset' : rain_lines - index,
							'--rain-lines' : rain_lines,
							'--right-offset' : 1,
						};
						return (<div key={index + 1} style={styles} className="rain-drop" />)
				})}
			</div>
			<div className="rain-text">
				<div className="rain-text-catch">Never Compromise On Yourself</div>
				<div className="rain-text-site">baysalt.dev</div>
			</div>
		</div>
	);
}
