import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function UpdateForm({ updatingFilm, setUpdateScreen }) {
	const { user } = useAuthContext()

	const [formData, setFormData] = useState(updatingFilm)

	const handleChange = event => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const idToUpdate = updatingFilm._id

		try {
			const response = await fetch(`api/filmai/${idToUpdate}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`)
			}

			const updatedData = await response.json()
			console.log('Updated data:', updatedData)
			setUpdateScreen(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='title'
				value={formData.title || ''}
				onChange={handleChange}
			/>
			<input
				name='production'
				value={formData.production || ''}
				onChange={handleChange}
			/>
			<input
				name='director'
				value={formData.director || ''}
				onChange={handleChange}
			/>
			<input name='cast' value={formData.cast || ''} onChange={handleChange} />
			<input
				name='rating'
				value={formData.rating || ''}
				onChange={handleChange}
			/>
			<input
				name='description'
				value={formData.description || ''}
				onChange={handleChange}
			/>
			<button type='submit'>Redaguoti</button>
		</form>
	)
}

export default UpdateForm
