// import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from 'react';
import Homepage from './pages/homepage';
import ThemeButton from './components/theme-button';

export const ThemeContext = createContext(null);
const App = () => {
	const [theme, setTheme] = useState(false);
	// return React.createElement('div',{className:'customclass', id:'123'},'This is our first component 2');
	return (
		<ThemeContext.Provider value={{
			theme, setTheme
		}}>
			<div className="App" style={theme? { backgroundColor: '#feb300' }:{}}>
				<ThemeButton />
				<Homepage />{' '}
			</div>
		</ThemeContext.Provider>
	);
};

export default App;
