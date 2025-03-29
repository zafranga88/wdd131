const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
      templeName: "Rome Italy",
      location: "Rome, Italy",
      dedicated: "2019, March, 10",
      area: 40903,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/800x500/6-Rome-Temple-2160338.jpg"
    },
    {
      templeName: "Salt Lake",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 253015,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/800x500/slctemple7.jpg"
    },
    {
      templeName: "Hong Kong China",
      location: "Hong Kong, China",
      dedicated: "1996, May, 26",
      area: 21744,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/800x500/hong_kong_china_temple_baptistry.jpeg"
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = lastModified;

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
   
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('open');
    });

    const templesContainer = document.getElementById('temples-container');

    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        displayTemples(temples);
    });
    
    document.getElementById('nav-old').addEventListener('click', (e) => {
        e.preventDefault();
        displayTemples(filterOldTemples());
    });
    
    document.getElementById('nav-new').addEventListener('click', (e) => {
        e.preventDefault();
        displayTemples(filterNewTemples());
    });
    
    document.getElementById('nav-large').addEventListener('click', (e) => {
        e.preventDefault();
        displayTemples(filterLargeTemples());
    });
    
    document.getElementById('nav-small').addEventListener('click', (e) => {
        e.preventDefault();
        displayTemples(filterSmallTemples());
    });

    displayTemples(temples);

    function displayTemples(templesToDisplay) {

        templesContainer.innerHTML = '';

        templesToDisplay.forEach(temple => {

            const card = document.createElement('div');
            card.classList.add('temple-card');

            card.innerHTML = `
                <h3>${temple.templeName}</h3>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
                <div class="temple-info">
                    <p><strong>Location:</strong> ${temple.location}</p>
                    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
                </div>
            `;

            templesContainer.appendChild(card);
        });
    }

    function filterOldTemples() {
        return temples.filter(temple => {
            const dedicationParts = temple.dedicated.split(', ');
            const dedicationYear = parseInt(dedicationParts[0]);
            return dedicationYear < 1900;
        });
    }
    
    function filterNewTemples() {
        return temples.filter(temple => {
            const dedicationParts = temple.dedicated.split(', ');
            const dedicationYear = parseInt(dedicationParts[0]);
            return dedicationYear > 2000;
        });
    }
    
    function filterLargeTemples() {
        return temples.filter(temple => temple.area > 90000);
    }
    
    function filterSmallTemples() {
        return temples.filter(temple => temple.area < 10000);
    }
});