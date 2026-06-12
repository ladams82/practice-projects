export function grader() {
	function Grader(input) {
		let redMarker = getSynon.include(input);

		if (redMarker === true) {
			console.log('correct answer!');
			return true;
		} else {
			console.log('wrong answer ;-;');
			return false;
		}
	}
}
