import { useState,  } from 'react'
import { fetchNotes } from "../../services/noteService.ts"
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList.tsx'
import type { NotesQueryParams } from '../../services/noteService.ts'
import Pagination from '../Pagination/Pagination.tsx'
import Modal from '../Modal/Modal.tsx'
import NoteForm from '../NoteForm/NoteForm.tsx'
import SearchBox from '../SearchBox/SearchBox.tsx'


function App() {
  const [search, setSearch] = useState<NotesQueryParams>({
     search: '',
  page: 1,
    perPage: 10,
    tag: 'Todo',
    sortBy: 'created',
  })
  // const [page, setPage] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes(search),
    placeholderData: keepPreviousData
  })
  
  const totalPages = data?.totalPages ?? 0
  const closeModal = () =>  setIsModalOpen(false) 
  
  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleSearchInput = useDebouncedCallback( (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev)=> ({
      ...prev,
      search: event.target.value,
  page: 1,
    }))
  }, 1000)
  const handlePageChange = (newPage: number) => {
    setSearch((prev) => ({
      ...prev,
      page: newPage,
    }))
  }
  console.log(data);
  

  return (
    
      <div className={css.app}>
      <header className={css.toolbar}
      > 
        <SearchBox defaultValue={search.search} onChange={handleSearchInput}  />
        {isSuccess && totalPages > 0 && <Pagination page={search.page} setPage={handlePageChange} totalPages={totalPages} />}
        <button className={css.button} onClick={handleClick}>Create note +</button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}/>
      </Modal> }
</div>

  )
}

export default App
