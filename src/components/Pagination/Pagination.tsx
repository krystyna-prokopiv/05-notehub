import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from './Pagination.module.css'

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface ReactPaginationProps {
    totalPages: number,
    page: number,
    setPage: (selected:number)=> void
}


export default function Pagination({ totalPages, page, setPage }: ReactPaginationProps) {
    return (
        <ReactPaginate
        pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setPage(selected + 1)}
forcePage={page - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
        />
            
      
    )
}