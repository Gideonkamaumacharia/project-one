document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("btn").addEventListener("click", function() {
        let input = document.getElementById("input").value.trim();
        let output = document.getElementById("book-list");
        output.innerHTML = ""; // Clear previous search results
    
        if (input !== "") {
            // Fetch data from Open Library API
            fetch(`https://openlibrary.org/search.json?q=${input}`)
            .then(response => response.json())
            .then(data => {
                // Display search results
                if (data.docs && data.docs.length > 0) {
                    data.docs.forEach((book) => {
                        let li = document.createElement("li");
                        
                        li.textContent = book.title;
                        output.appendChild(li);
                    });
                } else {
                    let li = document.createElement("li");
                    li.textContent = "No results found";
                    output.appendChild(li);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            let li = document.createElement("li");
            li.textContent = "Please enter a search query";
            output.appendChild(li);
        }
    }); 
    
    function buttonMouseOver(){
        let btn = document.getElementById("btn")
        btn.addEventListener("mouseover",()=>{
            btn.style.background = "violet";
            btn.style.opacity = 0.8
    })}
    buttonMouseOver()
    
    function buttonMouseOut(){
        let btn = document.getElementById("btn")
        btn.addEventListener("mouseout",()=>{
            btn.style.background = "white"; 
            btn.style.opacity = 0.8
    })}
    buttonMouseOut()
    let description = document.getElementById("p")
    description.innerText = "Books are wonderful things; they give you a pathway to enter the world of fantasies, delve into history, solve mysteries, and so much more. But two things that haunt readers around the world are not knowing which book to read next and forgetting the name of that one amazing book they read long ago.That's when this website comes to the rescue because it helps you conduct a book search."
    
    
    let bookDetails = document.createElement("div");
    
    function getPreferedBook(book) {
        
        fetch(`https://openlibrary.org/search.json?q=${book}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let preferedBook = document.getElementById("prefered-book");
            preferedBook.innerHTML = ""; 
    
            if (data.docs && data.docs.length > 0) {
                let selectedBook = ""
    
                
                bookDetails.addEventListener('click', getBookDetails)
    
                selectedBook = preferedBook.appendChild(bookDetails)
    
            } else {
                let li = document.createElement("li");
                li.textContent = "No details found for the selected book";
                preferedBook.appendChild(li);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function getBookDetails(){
        bookDetails.innerHTML = `
            <h4>${data.title}</h4>
            <p>ID: ${data.id}</p>
            <p>Authors: ${data.authors ? data.authors.map(author => author.name).join(', ') : 'Unknown'}</p>
            <p>Publishers: ${data.publishers ? data.publishers.map(publisher => publisher.name).join(', ') : 'Unknown'}</p>
            <p>Summary: ${data.description ? data.description.value : 'No summary available'}</p>
            <p>Cover: ${data.cover ? data.cover.map(cover => `<img src="https://covers.openlibrary.org/b/id/${cover.id}-L.jpg">`).join('') : 'No image available'}</p>
           
    `;
    }
    getPreferedBook()
    })