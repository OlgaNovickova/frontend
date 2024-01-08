import { useMovieContext } from '../hooks/useMovieContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const MovieDetails = ({ filmas, updateFilmScreenManager }) => {
	const { dispatch } = useMovieContext()
	const { user } = useAuthContext()

	const handleClick = async () => {
		if (!user) {
			return
		}
		const response = await fetch('/api/filmai/' + filmas._id, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${user.token}` },
		})
		const json = await response.json()

		if (response.ok) {
			dispatch({ type: 'DELETE_MOVIE', payload: json })
		}
	}

	return (
		<div className='movie-details'>
			<h4>{filmas.title}</h4>
			<p>
				<strong>Išleidimo metai: </strong>
				{filmas.production}
			</p>
			<p>
				<strong>Režisierius: </strong>
				{filmas.director}
			</p>
			<p>
				<strong>Pagrindiniai aktoriai: </strong>
				{filmas.cast}
			</p>
			<p>
				<strong>Įvertinimas: </strong>
				{filmas.rating}
			</p>
			<p>
				<strong>Trumpas aprašymas: </strong>
				{filmas.description}
			</p>
			<p>
				{formatDistanceToNow(new Date(filmas.createdAt), { addSuffix: true })}
			</p>
			<span className='material-symbols-outlined' onClick={handleClick}>
				delete
			</span>
			<button
				onClick={() => {
					updateFilmScreenManager(filmas)
				}}
			>
				Redaguoti filmą
			</button>
		</div>
	)
}

export default MovieDetails
