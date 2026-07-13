import css from './SearchBox.module.css'

export default function SearchForm() {
    return (
        <input
  className={css.input}
  type="text"
  placeholder="Search notes"
 />

    )
}