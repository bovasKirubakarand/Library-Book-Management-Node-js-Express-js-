const express = require("express");
const bodyParser = require("body-parser");
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
const books= [{
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
},
{
    bookName: "Do Epic things",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
}
]
app.post("/", (req, res) => {
    //below we are setting a structure of how we are going to be getting values from the form
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookPages= req.body.bookPages;
    const bookPrice = req.body.bookPrice;
    const bookState = req.body.bookState;

    if(bookName ==="" && bookAuthor==="", bookPages==="", bookPrice===""){
       console.log("The fields are empty please add fill them in to add a book");
    }

    books.push({
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPages: bookPages,
        bookPrice: bookPrice,
        bookState: "Available"
    })

    res.render("index", {data: books})

})

const server=app.get("/",(req,res)=>{
    res.render("index",{data: books});
})
app.post("/issue", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "issued";
        }
    })
    res.render("index", {data: books});
});
app.post("/return", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "Available";
        }
    })
    res.render("index", {data: books});
});
app.post("/delete", (req, res) => {
    const deleteBook = req.body.bookName;
    let i = 0;
    books.forEach(book => {
        i = i + 1;
        if(book.bookName == deleteBook){
            books.splice((i - 1), 1);
        }
    });
    res.render("index", {data: books});
})
const PORT= process.env.PORT|| 2000;
server.listen(PORT,()=>console.log(`The server is running at http://localhost:${PORT}`));