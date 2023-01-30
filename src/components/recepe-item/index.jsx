import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './style.css'


const RecipeIten = ({item, type, changeStatus}) => {
	const {theme}=useContext(ThemeContext);

    const handelClick = (event) => {
        event.preventDefault();
        changeStatus(item);
    };
	return (
        <div className="recipe-item">
            <div>
                <img src={item.image} alt={item.title} />
            </div>
                <p style={theme? { color: '#12343b' }:{}}>{item.title}</p>
                <button style={theme? { backgroundColor: '#12343b' }:{}} onClick={handelClick}>{type==='favorite'? 'Remove from':'Add to'}  favorites</button> </div>
    );
};

export default RecipeIten;
