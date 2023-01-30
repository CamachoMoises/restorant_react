import Search from '../../components/search';
import axios from 'axios';
import './style.css';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from 'react';
import RecipeIten from '../../components/recepe-item';
import { ThemeContext } from '../../App';

const dummyData = 'F on chat';

const Homepage = () => {
	const { theme } = useContext(ThemeContext);
	const initialState = {
		filteredValue: '',
	};
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [recipes, setReceipes] = useState([]);
	const [APIResponse, setAPIResponse] = useState(false);
	const reducer = (state, action) => {
		switch (action.type) {
			case 'filterFavorites':
				return { ...state, filteredValue: action.value };

			default:
				return state;
		}
	};
	const [filteredSate, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		const extractFavorites = JSON.parse(
			localStorage.getItem('favorites')
		) || [];
		setFavorites(extractFavorites);
		return () => {
			'hola';
		};
	}, []);

	const getData = (value) => {
		getRecipes(value);
	};

	const getRecipes = async (value) => {
		setLoading(true);
		// axios.defaults.headers['apiKey'] = 'c107453f7d0a4f6b8fa885f3fda8137c';
		await axios
			.get(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=c107453f7d0a4f6b8fa885f3fda8137c&query=${value}`
			)
			.then((res) => {
				setLoading(false);
				const { results } = res.data;

				if (results && results.length) {
					setReceipes(results);
					setAPIResponse(true);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	};

	const addToFavorites = useCallback(
		(itemFav) => {
			let cpyFavorites = [...favorites];
			const index = cpyFavorites.findIndex(
				(item) => item.id === itemFav.id
			);
			if (index === -1) {
				setFavorites((fav) => [itemFav, ...fav]);
				localStorage.setItem(
					'favorites',
					JSON.stringify([itemFav, ...cpyFavorites])
				);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				alert('Item is already a favorite');
			}
		},
		[favorites]
	);
	const removeFavorite = (itemFav) => {
		const newFavorites = favorites.filter(
			(item) => item.id !== itemFav.id
		);
		setFavorites(newFavorites);
		localStorage.setItem('favorites', JSON.stringify(newFavorites));
	};

	const searchInFavorites = (fav) => {
		dispatch({ type: 'filterFavorites', value: fav });
	};

	const filterFavoriteItems = favorites &&  favorites.length>0 ? favorites.filter((item) =>
		item.title
			.toLowerCase()
			.includes(filteredSate.filteredValue.toLowerCase())
	): [];

	const renderRecipes = useCallback(() => {
		if (recipes && recipes.length > 0) {
			return recipes.map((item, index) => (
				<RecipeIten
					key={item.id}
					item={item}
					type="normal"
					changeStatus={addToFavorites}
				/>
			));
		}
	}, [recipes, addToFavorites]);
	return (
		<div className="homepage">
			<Search
				dummyData={dummyData}
				getData={getData}
				APIResponse={APIResponse}
				setAPIResponse={setAPIResponse}
			/>

			{/*  Show loading state  */}

			{loading && (
				<div className="loading">Loading Recipes please wait</div>
			)}

			{/*  Show loading state  */}

			{/*  Show favorites items  */}

			<div className="favorites-wrapper">
				<h1
					style={theme ? { color: '#12343b' } : {}}
					className="favorites-title"
				>
					{' '}
					Favorites{' '}
				</h1>

				<div className="search-favorites">
					<input
						type="text"
						onChange={(event) =>
							searchInFavorites(event.target.value)
						}
						value={filteredSate.filteredValue}
						name="searchFavorites"
						placeholder="Search favorites"
					/>
				</div>

				{!filterFavoriteItems.length && (
					<div className="no-items"> No favorites are found</div>
				)}

				<div className="favorites">
					{filterFavoriteItems && filterFavoriteItems.length > 0
						? filterFavoriteItems.map((item, index) => (
								<RecipeIten
									key={item.id}
									item={item}
									type="favorite"
									changeStatus={removeFavorite}
								/>
						  ))
						: null}
				</div>
			</div>

			{/*  Show favorites items  */}

			{/*  map through all the recipes  */}
			<div className="items">
				{/* {recipes && recipes.length > 0
					? recipes.map((item, index) => (
							<RecipeIten
								key={item.id}
								item={item}
								type="normal"
								changeStatus={addToFavorites}
							/>
					  ))
					: null} */}
				{/* {renderRecipes()} */}

				{useMemo(
					() =>
						!loading && recipes && recipes.length > 0
							? recipes.map((item, index) => (
									<RecipeIten
										key={item.id}
										item={item}
										type="normal"
										changeStatus={addToFavorites}
									/>
							  ))
							: null,

					[loading, recipes, addToFavorites]
				)}
			</div>
			{/*  map through all the recipes  */}

			{!loading && !recipes.length && (
				<div className="no-items"> No recipes are found</div>
			)}
		</div>
	);
};

export default Homepage;
