import css from "./SearchBox.module.css";

interface SearchBoxProps {
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange, defaultValue }: SearchBoxProps) {
  return (
    <input
      defaultValue={defaultValue}
      onChange={onChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
