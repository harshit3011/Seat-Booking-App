//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
// Use moviesList array for displaing the Name in the dropdown menu
//Add eventLister to each unoccupied seat
//Add eventLsiter to continue Button
//Add eventListerner to Cancel Button
const selectMovie = document.getElementById("selectMovie");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const seats = document.querySelectorAll("#seatCont .seat");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const continueButton = document.getElementById("proceedBtn");
const cancelButton = document.getElementById("cancelBtn");

let selectedSeats = [];

// Function to update selected seats section
function updateSelectedSeats() {
    selectedSeats = Array.from(seats).filter(seat => seat.classList.contains("selected"));
    selectedSeatsHolder.innerHTML = ""; // Clear existing content
    if (selectedSeats.length > 0) {
        selectedSeats.forEach(seat => {
            const seatSpan = document.createElement("span");
            seatSpan.textContent = seat.parentElement.parentElement.classList[1] + "-" + (Array.from(seat.parentElement.children).indexOf(seat) + 1);
            selectedSeatsHolder.appendChild(seatSpan);
        });
    } else {
        selectedSeatsHolder.textContent = "No Seat Selected";
    }
}

// Function to update total price
function updateTotalPrice() {
    const selectedMovieIndex = selectMovie.selectedIndex;
    const selectedMovie = moviesList[selectedMovieIndex];
    totalPriceElement.textContent = "$ " + (selectedSeats.length * selectedMovie.price);
}

// Event listener for movie selection
selectMovie.addEventListener("change", function() {
    const selectedMovieIndex = selectMovie.selectedIndex;
    const selectedMovie = moviesList[selectedMovieIndex];
    movieNameElement.textContent = selectedMovie.movieName;
    moviePriceElement.textContent = "$ " + selectedMovie.price;
    totalPriceElement.textContent = "$ 0"; // Reset total price
});

// Event listener for seat selection
seats.forEach(seat => {
    if (!seat.classList.contains("occupied")) {
        seat.addEventListener("click", function() {
            seat.classList.toggle("selected");
            updateSelectedSeats();
            updateTotalPrice();
        });
    }
});


// Event listener for continue button
continueButton.addEventListener("click", function() {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("occupied");
        });
        updateSelectedSeats();
        totalPriceElement.textContent = "$ 0"; // Reset total price
    }
});

// Event listener for cancel button
cancelButton.addEventListener("click", function() {
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
    });
    selectedSeats = [];
    updateSelectedSeats();
    totalPriceElement.textContent = "$ 0"; // Reset total price
});

// Initial setup
moviesList.forEach(movie => {
    const option = document.createElement("option");
    option.text = movie.movieName;
    selectMovie.add(option);
});
movieNameElement.textContent = "Flash"; // Default movie name
moviePriceElement.textContent = "$ 7"; // Default movie price
totalPriceElement.textContent = "$ 0"; // Default total price
selectedSeatsHolder.textContent = "No Seat Selected"; // Default selected seats holder
