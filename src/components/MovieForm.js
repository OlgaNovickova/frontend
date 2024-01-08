import { useState } from 'react'
import { useMovieContext } from '../hooks/useMovieContext'
import { useAuthContext } from '../hooks/useAuthContext'

const MovieForm = () => {
  const [title, setTitle] = useState('')
	const [production, setProduction] = useState('')
	const [director, setDirector] = useState('')
	const [cast, setCast] = useState('')
	const [rating, setRating] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState(null)
  const { dispatch } = useMovieContext()
  const {user} = useAuthContext()
  const [emptyFields, setEmptyFields] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()
    if(!user) {
      setError('Būtina prisijungti.')
      return
    }
		const filmas = { title, production, director, cast, rating, description }
		const response = await fetch('/api/filmai', {
			method: 'POST',
			body: JSON.stringify(filmas),
			headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user.token}`
     }
		})
		const json = await response.json()
		if (!response.ok) {
			setError(json.error)
      setEmptyFields(json.emptyFields)
		}
		if (response.ok) {
      setEmptyFields([])
			setTitle('')
			setProduction('')
			setDirector('')
			setCast('')
			setRating('')
			setDescription('')
			setError(null)
			console.log('Naujas filmas pridėtas', json)
      dispatch({type: 'CREATE_MOVIE', payload: json})
		}
	}

	return (
		<form className='create' onSubmit={handleSubmit}>      
			<h3>Pridėti  naują  filmą</h3>
			<label>Filmo pavadinimas:</label>
			<input className={emptyFields.includes('title') ? 'error' : ''}				
				type='text'
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<label>Išleidimo metai:</label>
			<input className={emptyFields.includes('production') ? 'error' : ''}				
				type='number'
				onChange={(e) => setProduction(e.target.value)}
				value={production}
			/>
			<label>Režisierius:</label>
			<input className={emptyFields.includes('director') ? 'error' : ''}		
				type='text'
				onChange={(e) => setDirector(e.target.value)}
				value={director}
			/>
			<label>Pagrindiniai aktoriai:</label>
			<input className={emptyFields.includes('cast') ? 'error' : ''}		
				type='text'
				onChange={(e) => setCast(e.target.value)}
				value={cast}
			/>
			<label>Įvertinimas:</label>
			<input className={emptyFields.includes('rating') ? 'error' : ''}				
				type='number'
				onChange={(e) => setRating(e.target.value)}
				value={rating}
			/>
			<label>Trumpas aprašymas:</label>
			<input className={emptyFields.includes('description') ? 'error' : ''}
				type='text'
				onChange={(e)=> setDescription(e.target.value)}
				value={description}
			/>
			<button>Pridėti filmą</button>
			{error && <div className='error'>{error}</div>}
		</form>
	)
}

export default MovieForm
 