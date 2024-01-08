import React from 'react'
import { useState } from 'react'
import { useMovieContext } from '../hooks/useMovieContext'

function Sort({ value, onChangeSort }) {
	const { filmai, dispatch } = useMovieContext()
	const [open, setOpen] = useState(false)

	const list = [
		{ name: 'išleidimo metus', sortProperty: 'production' },
		{ name: 'įvertinimą', sortProperty: 'rating' },
	]

	const onClickList = i => {
		onChangeSort(i)
		let sortedFilms = []

		if (i.sortProperty === 'production') {
			sortedFilms = [...filmai.sort((a, b) => a.production - b.production)]
		} else {
			sortedFilms = [...filmai.sort((a, b) => a.rating - b.rating)]
		}

		dispatch({ type: 'SET_MOVIES', payload: sortedFilms })
		setOpen(false)
	}

	return (
		<div className='sort'>
			<div className='sort_label'>
				<svg
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					viewBox='0 0 320 512'
					height='1em'
					width='1em'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'></path>
				</svg>
				<p>Rūšiuoti pagal:</p>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{open && (
				<div className='sort_popup'>
					<ul>
						{list.map((obj, i) => (
							<li
								key={i}
								onClick={() => onClickList(obj)}
								className={
									value.sortProperty === obj.sortProperty ? 'active' : ''
								}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Sort
