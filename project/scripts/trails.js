document.addEventListener('DOMContentLoaded', function() {

    function handleTrailDetailView() {

        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('trail');
        
        const trailsGallery = document.querySelector('.trails-gallery');
        const trailFilters = document.querySelector('.trail-filters');
        const userReviews = document.querySelector('.user-reviews');
        const trailDetailSection = document.getElementById('trail-detail-view');
        
        if (trailId) {

            if (trailsGallery) trailsGallery.style.display = 'none';
            if (trailFilters) trailFilters.style.display = 'none';
            
            if (trailDetailSection) {
                trailDetailSection.style.display = 'block';
                
                const trailData = getTrailData(trailId);
                
                if (trailData) {
                    document.getElementById('detail-trail-name').textContent = trailData.name;
                    document.getElementById('detail-trail-location').textContent = trailData.location;
                    document.getElementById('detail-trail-difficulty').textContent = trailData.difficulty;
                    document.getElementById('detail-trail-duration').textContent = trailData.duration;
                    document.getElementById('detail-trail-distance').textContent = trailData.distance;
                    document.getElementById('detail-trail-description').textContent = trailData.description;
                    document.getElementById('detail-trail-image').src = trailData.image;
                    document.getElementById('detail-trail-image').alt = trailData.name;
                    
                    loadTrailReviews(trailId);
                } else {

                    trailDetailSection.innerHTML = `
                        <div class="error-message">
                            <h2>Trail Not Found</h2>
                            <p>Sorry, we couldn't find details for the requested trail.</p>
                            <a href="trails.html" class="back-button">Back to All Trails</a>
                        </div>
                    `;
                }
            }

            if (userReviews) {
                userReviews.style.display = 'block';
                document.getElementById('trail-select').value = trailId;
            }
        } else {

            if (trailsGallery) trailsGallery.style.display = 'block';
            if (trailFilters) trailFilters.style.display = 'block';
            if (trailDetailSection) trailDetailSection.style.display = 'none';
            if (userReviews) userReviews.style.display = 'block';
        }
    }
    
    function getTrailData(id) {

        const trails = {
            "1": {
                name: "Laguna de los Tres",
                location: "El Chaltén",
                difficulty: "Moderate",
                duration: "8 hours",
                distance: "21 km",
                description: "One of the most iconic hikes in Patagonia with breathtaking views of Mount Fitz Roy. The trail starts in El Chaltén and leads to a pristine glacial lake at the base of Mount Fitz Roy. The final kilometer is steep and challenging, but the panoramic views at the top are well worth the effort. The turquoise waters of the lagoon reflect the jagged peaks of the Fitz Roy massif, creating one of the most photographed landscapes in all of Patagonia.",
                image: "images/laguna-de-los-tres.jpg",
                features: ["glacier", "mountain", "lake"]
            },
            "2": {
                name: "Laguna Torre",
                location: "El Chaltén",
                difficulty: "Moderate",
                duration: "6 hours",
                distance: "18 km",
                description: "A beautiful trek leading to a glacial lake with views of Cerro Torre. This trail takes you through lenga forests and along the Fitz Roy River to Laguna Torre, where you can see the iconic needle-like peak of Cerro Torre rising dramatically above the glacier and lake. The path is relatively flat for most of the way, with a few gentle ascents.",
                image: "images/laguna-torre.jpg",
                features: ["glacier", "mountain", "lake"]
            },
            "3": {
                name: "Perito Moreno Glacier Walk",
                location: "El Calafate",
                difficulty: "Easy",
                duration: "3 hours",
                distance: "5 km",
                description: "Experience walking on one of the world's most famous advancing glaciers. This guided excursion takes you onto the surface of the massive Perito Moreno Glacier, where you'll walk with crampons over the ice, exploring crevasses, ice caves, and unique blue ice formations. The trek includes spectacular views of the glacier's terminus and surrounding landscapes.",
                image: "images/perito-moreno.jpg",
                features: ["glacier", "wildlife"]
            },
            "4": {
                name: "Huemul Circuit",
                location: "El Chaltén",
                difficulty: "Challenging",
                duration: "4 days",
                distance: "64 km",
                description: "A challenging 4-day circuit with views of the Southern Patagonian Ice Field. This demanding trek takes experienced hikers around Cerro Huemul, featuring river crossings, technical traverses, and panoramic views of the Southern Patagonian Ice Field. You'll need to use harnesses and carabiners for Tyrolean traverses across rivers. The trek offers unparalleled wilderness experience and stunning vistas of glaciers and mountains.",
                image: "images/huemul-circuit.jpg",
                features: ["glacier", "mountain", "lake", "forest", "wildlife"]
            },
            "5": {
                name: "Los Glaciares Lookout",
                location: "El Calafate",
                difficulty: "Easy",
                duration: "3 hours",
                distance: "4 km",
                description: "Boardwalks and easy trails with views of the Perito Moreno Glacier. This accessible trail system consists of well-maintained boardwalks and viewing platforms that offer spectacular vistas of the Perito Moreno Glacier. You can observe the massive ice wall and maybe witness dramatic ice calving events as chunks of the glacier break off and crash into the water.",
                image: "images/glaciares-lookout.jpg",
                features: ["glacier", "lake", "wildlife"]
            },
            "6": {
                name: "Cerro Tronador",
                location: "Bariloche",
                difficulty: "Difficult",
                duration: "2 days",
                distance: "36 km",
                description: "A challenging ascent of the 'Thundering Mountain' with amazing Andes views. This trek takes you to the base of Cerro Tronador, an extinct volcano covered in glaciers. The name comes from the thundering sound of falling seracs (ice blocks). The trail passes through diverse Andean-Patagonian forests, alongside rivers, and offers views of several glaciers including the Black Glacier (Ventisquero Negro).",
                image: "images/cerro-tronador.jpg",
                features: ["glacier", "mountain", "forest", "lake"]
            },
            "7": {
                name: "Tierra del Fuego Coastal Path",
                location: "Ushuaia",
                difficulty: "Moderate",
                duration: "6 hours",
                distance: "15 km",
                description: "Explore the southernmost forests with views of the Beagle Channel. This coastal trail in Tierra del Fuego National Park takes you through southern beech forests along the shoreline of the Beagle Channel. You'll encounter diverse wildlife, including woodpeckers, foxes, and marine birds. The path offers beautiful views of the channel and the surrounding mountains of the end of the world.",
                image: "images/tierra-del-fuego.jpg",
                features: ["forest", "wildlife"]
            },
            "8": {
                name: "Nahuel Huapi Traverse",
                location: "Bariloche",
                difficulty: "Difficult",
                duration: "3 days",
                distance: "42 km",
                description: "Multi-day trek through diverse ecosystems in Argentina's oldest national park. This traverse crosses the northern section of Nahuel Huapi National Park, taking hikers through ancient forests, alpine meadows, and mountain passes. The trail connects a series of mountain refugios (huts) where hikers can stay overnight. You'll experience the diverse ecosystems of the Andean-Patagonian transition zone and enjoy panoramic views of lakes and mountains.",
                image: "images/nahuel-huapi.jpg",
                features: ["mountain", "forest", "lake", "wildlife"]
            }
        };
        
        return trails[id];
    }
    
    function loadTrailReviews(trailId) {

        const reviews = document.querySelectorAll('.review-item');
        
        reviews.forEach(review => {
            const reviewTrailName = review.querySelector('.review-trail-name').textContent;
            const matchingTrail = getTrailData(trailId);
            
            if (matchingTrail && reviewTrailName === matchingTrail.name) {
                review.style.display = 'block';
            } else {
                review.style.display = 'none';
            }
        });
    }
    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('back-to-trails')) {
            event.preventDefault();
            window.location.href = 'trails.html';
        }
    });
    
    handleTrailDetailView();
    
});