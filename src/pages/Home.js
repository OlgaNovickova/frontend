import { useEffect, useState } from 'react'
import MovieDetails from '../components/MovieDetails'
import MovieForm from '../components/MovieForm'
import { useMovieContext } from '../hooks/useMovieContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Sort from '../components/Sort'
import UpdateForm from '../components/UpdateMovie'

const Home = () => {
	const { filmai, dispatch } = useMovieContext()
	const { user } = useAuthContext()
	const [sortType, setSortType] = useState({
		name: 'išleidimo metus',
		sortProperty: 'production',
	})
	const [updateScreen, setUpdateScreen] = useState(false)
	const [updatingFilm, setUpdatingFilm] = useState({})

	const updateFilmScreenManager = filmas => {
		setUpdateScreen(prev => !prev)
		setUpdatingFilm(filmas)
	}

	useEffect(() => {
		const fetchFilmus = async () => {
			const response = await fetch('/api/filmai', {
				headers: { Authorization: `Bearer ${user.token}` },
			})
			const json = await response.json()
			if (response.ok) {
				dispatch({ type: 'SET_MOVIES', payload: json })
			}
		}
		if (user) {
			fetchFilmus()
		}
	}, [user, updateScreen])

	return (
		<div className='home'>
			<div className='movies'>
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />

				{updateScreen ? (
					<UpdateForm
						updatingFilm={updatingFilm}
						setUpdateScreen={setUpdateScreen}
					/>
				) : (
					filmai &&
					filmai.map(filmas => (
						<MovieDetails
							key={filmas._id}
							filmas={filmas}
							updateFilmScreenManager={updateFilmScreenManager}
						/>
					))
				)}
			</div>

			<MovieForm />
		</div>
	)
}

export default Home
