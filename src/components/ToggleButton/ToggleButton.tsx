import { useState, ChangeEvent } from 'react';
import { ToggleButtonProps } from '../../typescript/interfaces';
import './ToggleButton.css';

function ToggleButton({ themeMode }: ToggleButtonProps) {
	const [whichMode, setWhichMode] = useState(themeMode);

	const toggleTheme = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const theme = target.checked ? 'dark' : 'light';
		setWhichMode(theme);
		localStorage.setItem('theme', theme);

		if (theme === 'dark') {
			document.body.classList.add('dark');
			return;
		}
		document.body.classList.remove('dark');
	};

	return (
		<label htmlFor="toggle-theme">
			<span className="switch-wrapper">
				<input
					aria-label="toggle-theme"
					aria-checked={whichMode === 'dark'}
					id="toggle-theme"
					name="toggleTheme"
					type="checkbox"
					checked={whichMode === 'dark'}
					onChange={toggleTheme}
				/>
				<span className="switch">
					<span className="switch-handle" />
				</span>
			</span>
		</label>
	);
}

export default ToggleButton;
