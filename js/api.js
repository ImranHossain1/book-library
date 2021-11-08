// Loading data from searchField
const loadData = (bookName) =>{
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=> showData(data));
}

 //loadData();
// Show result in grid card
const showData = (books)=>{
       console.log(books);
       const bookNumbers = document.getElementById('book-numbers');
       // Remove previous book numbers
       bookNumbers.textContent = '';

       const bookField = document.getElementById('books');
       bookField.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4', 'm-3', 'd-flex');
        // remove previous book list 
       bookField.textContent ='';
       const p = document.createElement('p');
       if(!books.numFound){
           //if the result not found
            p.classList.add('border', 'bg-danger', 'text-white', 'p-3')
            p.innerHTML= `Please enter a valid book name`;
       }
       else{
            //    if result founds
            p.classList.add('border', 'bg-success', 'text-white', 'p-3')
            p.innerHTML= `Numbers of book found : ${books.numFound}`;
       }
       
        bookNumbers.appendChild(p);
        const bookList = books.docs;
        bookList?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML= `
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="image not uploaded" class="card-img-top img-style">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text">Author Name: ${book.author_name? book.author_name[0]: 'unknown'}</p>
                    <p class="card-text">Publisher: ${book.publisher? book.publisher[0]: 'unknown'}</p>
                    <p class="card-text">Publish year: ${book.publish_year? book.publish_year[0]: 'unknown'} </p>
                </div>          
            `
            bookField.appendChild(div);
        });
        displaySpinner('none'); //hide spinner when the result is found
        displayBooks('block'); //show book list when result found
        displayNumbers('block'); //show book numbers when result found
}

//spinner display style
const displaySpinner =(displayType)=>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayType;
}

//book list display style
const displayBooks =(displayType)=>{
    const spinner = document.getElementById('books');
    spinner.style.display = displayType;
}

//book numbers display style
const displayNumbers =(displayType)=>{
    const spinner = document.getElementById('book-numbers');
    spinner.style.display = displayType;
}

document.getElementById('search-button').addEventListener('click',function(){
    const searchField = document.getElementById('search-field').value;
    displaySpinner('block'); //show spinner while loading the data
    displayBooks('none'); // hide book list while loading data
    displayNumbers('none'); //hide book numbers while loading data
    loadData(searchField);
    document.getElementById('search-field').value = '';
})