import { useEffect, useState } from "react";
import { FetchBooks } from "./Service";
import Pagination from "./navigate";
import FavoriteBooks from "./favorites";

const BookSearch = ()=>{

    const [InputValue, setInputValue] = useState("");
    const [Results, setResults] = useState([]);
    const [loading, setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(1); //yntacik eji kargavichak, aysinqn vor ejum enq hima
    const [postsPerPage, setPostsPerPage] =useState(10); // te qani post petq e cucadrvi amen ejum
  
    
    useEffect(() => {
       if(!InputValue.trim()){
           setResults([]);
           return;
        }

         const DelayDebounce =setTimeout(() =>{
         handlesearch();
        },500);

          return() => clearTimeout(DelayDebounce);
          },[InputValue]);

     
    const handlesearch = async () =>{
        setLoading(false);
        const books = await FetchBooks(InputValue);
        setResults(books);
        setLoading(false);

        // const {docs, error} = await FetchBooks (InputValue);

        // if(error) {
        //   setError(error);
        // }
        // else if(docs.length===0){
        // setError("Didnt Found")
        // }

        // setResults(docs);
        // setLoading(false);
    }

    const handlePagination = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const addFavorites =(book) =>{
      const savedFavorites = localStorage.getItem('favorites');
      const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];
    

    if (!favoritesArray.find(item => item.key === book.key)) {
      const updatedFavorites = [...favoritesArray, book];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(`${book.title} Book added to favorites`);
    } else {
      alert(`${book.title} Already added!`);
    }};
 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Results.slice(indexOfFirstPost, indexOfLastPost);
  
    return (
    <div >
    <h1> Books Search</h1>
    
    <div>
      <input 
        type="text"
        value={InputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={handlesearch}>Search</button>
    </div>

    <div className="book-grid">
      {currentPosts.map((book, index) => (
        <div key={index} >
          <img 
            src={
              book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192?text=No+Cover'
            }
            alt={book.title}
          />
          <h2>{book.title}</h2>
          <p> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p> {book.first_publish_year || 'N/A'}</p>
          <button onClick={() => addFavorites(book)}>Add to favorites</button>
        </div>
      ))}</div>
      <div>
      <Pagination 
      postsPerPage={postsPerPage}
      length={Results.length}
      handlePagination={handlePagination}
      currentPage={currentPage}/>
    </div>
  </div>
  );
}

export default BookSearch;