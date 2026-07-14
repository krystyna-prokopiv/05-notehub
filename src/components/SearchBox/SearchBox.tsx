
import css from './SearchBox.module.css'

interface SearchFormProps {
     defaultValue: string
    handleSearchInput: (event:React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchForm({handleSearchInput, defaultValue}:SearchFormProps) {
    
     
    console.log();
    
    return (
        <input
            defaultValue={defaultValue}
            onChange={handleSearchInput}
            
  className={css.input}
  type="text"
  placeholder="Search notes"
 />

    )
}