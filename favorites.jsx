import { useEffect, useState } from "react";

const FavoriteBooks = () =>{

    const [favorites, setFavorites] =useState([]);

    useEffect(() =>{
        const savedFavorites =localStorage.getItem('favorites');
        if(savedFavorites){
            setFavorites(JSON.parse(savedFavorites));
        }
    },[]);


 return (
    <div>
        <h2>Favorite books</h2>
        <div>
            { favorites.map((book,index) =>(
                <div key={index}>
                    <img 
            src={
              book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192?text=No+Cover'
            }
            alt={book.title}
          />
          <h2>{book.title}</h2>
          <p> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p> {book.first_publish_year || 'N/A'}</p>
                </div>
            ))}
        </div>
    </div>
 );
}

export default FavoriteBooks;