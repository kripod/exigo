import InputFeedback from '../models/InputFeedback';

export default function getInputFeedbackProps(
  feedback: InputFeedback,
  preferDarkMode: boolean,
) {
  let fontWeight;
  let color;
  if (feedback === InputFeedback.SELECTED) {
    color = 'blue';
  } else if (feedback === InputFeedback.INCORRECT) {
    color = 'red';
  } else if (feedback === InputFeedback.CORRECT) {
    color = 'green';
    fontWeight = 600;
  }

  let backgroundColor;
  if (color) {
    backgroundColor = `${color}.${preferDarkMode ? 800 : 100}`;
  }

  return { fontWeight, color, backgroundColor };
}
