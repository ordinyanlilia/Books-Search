const Pagination =({postsPerPage, length, handlePagination, currentPage}) =>{
    const paginationNumbers =[];

    for (let i=1; i<=Math.ceil(length/postsPerPage); i++){
      paginationNumbers.push(i);
    }
  

  return (
    <div className="pagination">
    {paginationNumbers.map(number => (
       <button key={number} 
       className={currentPage === number ? 'active' : ''}
       onClick={() => handlePagination(number)} >{number} </button>
   ))}</div>
  )
}


export default Pagination;