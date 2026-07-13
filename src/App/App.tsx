import { useState, useEffect } from 'react'
import { fetchNotes, createNote } from "../services/noteService.ts"
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList.tsx'
import type { NotesQueryParams } from '../services/noteService.ts'
import Pagination from '../Pagination/Pagination.tsx'
import Modal from '../Modal/Modal.tsx'
import NoteForm from '../NoteForm/NoteForm.tsx'


function App() {
  const [search, setSearch] = useState<NotesQueryParams>({
     search: '',
  page: 1,
    perPage: 10,
    tag: 'Todo',
    sortBy: 'created',
  })
  const [page, setPage] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search),
    placeholderData: keepPreviousData
  })
  
  const totalPages = data?.totalPages ?? 0
  const closeModal = () =>  setIsModalOpen(false) 
  
  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    
      <div className={css.app}>
      <header className={css.toolbar}
      > 
        
        {isSuccess && totalPages > 0 && <Pagination page={page} setPage={() => setPage(page)} totalPages={totalPages} />}
        <button className={css.button} onClick={handleClick}>Create note +</button>
        

        
		{/* Компонент SearchBox */}
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}/>
      </Modal> }
</div>

  )
}

export default App
