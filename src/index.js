// write your code here
document.addEventListener('DOMContentLoaded', function () {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const newRamenForm = document.getElementById('new-ramen');
  
    // Function to fetch and render all ramens
    function fetchAndRenderRamen() {
      fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then(ramens => renderRamen(ramens));
  
      // Fetch details for the first ramen as soon as the page loads
      fetch('http://localhost:3000/ramens/1')
        .then(response => response.json())
        .then(ramen => renderRamenDetail(ramen));
    }
  
    // Function to render ramen images in the menu
    function renderRamen(ramens) {
      ramenMenu.innerHTML = '';
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => showRamenDetail(ramen));
        ramenMenu.appendChild(img);
      });
    }
  
    // Function to render ramen details
    function renderRamenDetail(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
      document.getElementById('rating-display').innerText = ramen.rating;
      document.getElementById('comment-display').innerText = ramen.comment;
    }
  
    // Function to show ramen details on click
    function showRamenDetail(ramen) {
      renderRamenDetail(ramen);
    }
  
    // Event listener for submitting new ramen form
    newRamenForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;
  
      if (name && restaurant && image && rating && comment) {
        createNewRamen({ name, restaurant, image, rating, comment });
      }
    });
  
    // Function to create new ramen
    function createNewRamen(newRamen) {
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newRamen)
      })
        .then(response => response.json())
        .then(() => fetchAndRenderRamen());
    }
  
    // Fetch and render ramens on page load
    fetchAndRenderRamen();
  });
  