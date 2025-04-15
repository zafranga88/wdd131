
document.addEventListener('DOMContentLoaded', () => {

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('show');
        });
    }
    
    updateFooterInfo();
    
    setupDurationCalculator();
    
    setupPackingChecklist();
    
    setupSeasonalTabs();
});

function updateFooterInfo() {
    const currentYearEl = document.getElementById('currentyear');
    const lastModifiedEl = document.getElementById('lastModified');
    
    if (currentYearEl) {
        const currentYear = new Date().getFullYear();
        currentYearEl.textContent = `© ${currentYear}`;
    }
    
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function setupDurationCalculator() {
    const calculateBtn = document.getElementById('calculate-duration');
    const resultDiv = document.getElementById('duration-result');
    
    if (calculateBtn && resultDiv) {
        calculateBtn.addEventListener('click', () => {

            const distance = parseFloat(document.getElementById('trail-distance').value);
            const elevationGain = parseFloat(document.getElementById('elevation-gain').value);
            const hikingPace = document.getElementById('hiking-pace').value;
            const breaksTime = parseInt(document.getElementById('breaks-time').value);
            
            if (isNaN(distance) || isNaN(elevationGain) || isNaN(breaksTime)) {
                resultDiv.innerHTML = `<div class="error-message">Please enter valid numbers for all fields</div>`;
                return;
            }
            
            const duration = calculateHikingDuration(distance, elevationGain, hikingPace, breaksTime);
            
            resultDiv.innerHTML = `
                <div class="result-content">
                    <h3>Estimated Hiking Duration</h3>
                    <div class="time-result">${formatDuration(duration.totalMinutes)}</div>
                    <div class="result-details">
                        <p><strong>Walking time:</strong> ${formatDuration(duration.walkingMinutes)}</p>
                        <p><strong>Elevation time:</strong> ${formatDuration(duration.elevationMinutes)}</p>
                        <p><strong>Breaks time:</strong> ${formatDuration(duration.breaksMinutes)}</p>
                    </div>
                    <p class="result-note">Note: This is an estimate. Actual hiking time may vary based on terrain conditions, weather, and your fitness level.</p>
                </div>
            `;
        });
    }
}

function calculateHikingDuration(distance, elevationGain, pace, breaksTime) {

    let speed;
    switch (pace) {
        case 'slow':
            speed = 2;
            break;
        case 'moderate':
            speed = 3;
            break;
        case 'fast':
            speed = 4;
            break;
        case 'very-fast':
            speed = 5;
            break;
        default:
            speed = 3;
    }
    
    const walkingMinutes = (distance / speed) * 60;
    
    const elevationMinutes = (elevationGain / 10);
    
    const totalMinutes = walkingMinutes + elevationMinutes + breaksTime;
    
    return {
        walkingMinutes: Math.round(walkingMinutes),
        elevationMinutes: Math.round(elevationMinutes),
        breaksMinutes: breaksTime,
        totalMinutes: Math.round(totalMinutes)
    };
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    
    if (hours === 0) {
        return `${mins} minutes`;
    } else if (mins === 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
        return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    }
}

function setupPackingChecklist() {
    const generateBtn = document.getElementById('generate-checklist');
    const saveBtn = document.getElementById('save-checklist');
    const checklistContainer = document.getElementById('checklist-container');
    
    if (generateBtn && checklistContainer) {
        generateBtn.addEventListener('click', () => {
            const hikeType = document.getElementById('hike-type').value;
            const hikeSeason = document.getElementById('hike-season').value;
            
            const checklist = generatePackingChecklist(hikeType, hikeSeason);
            
            displayChecklist(checklist, checklistContainer);
            
            if (saveBtn) {
                saveBtn.disabled = false;
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveChecklist();
        });
    }
}

function generatePackingChecklist(hikeType, season) {

    const essentials = [
        { name: "Backpack", category: "Essential Gear" },
        { name: "Water bottle or hydration system", category: "Essential Gear" },
        { name: "Navigation tools (map, compass, GPS)", category: "Essential Gear" },
        { name: "First aid kit", category: "Safety" },
        { name: "Whistle", category: "Safety" },
        { name: "Headlamp or flashlight (with extra batteries)", category: "Safety" },
        { name: "Multi-tool or knife", category: "Tools" },
        { name: "Sun protection (sunscreen, sunglasses, hat)", category: "Personal Care" },
        { name: "Insect repellent", category: "Personal Care" },
        { name: "Trail snacks", category: "Food & Water" },
        { name: "Personal ID and emergency contact info", category: "Documents" },
        { name: "Cash and/or credit card", category: "Documents" },
        { name: "Hiking boots or trail shoes", category: "Clothing" },
        { name: "Hiking socks", category: "Clothing" },
        { name: "Moisture-wicking shirt", category: "Clothing" },
        { name: "Hiking pants or shorts", category: "Clothing" },
        { name: "Waterproof/windproof jacket", category: "Clothing" }
    ];

    const overnightItems = [
        { name: "Tent or shelter", category: "Camping Gear" },
        { name: "Sleeping bag", category: "Camping Gear" },
        { name: "Sleeping pad", category: "Camping Gear" },
        { name: "Stove and fuel", category: "Cooking" },
        { name: "Cookware", category: "Cooking" },
        { name: "Food for all meals", category: "Food & Water" },
        { name: "Water filter or purification tablets", category: "Food & Water" },
        { name: "Extra clothing layers", category: "Clothing" },
        { name: "Toiletries", category: "Personal Care" },
        { name: "Toilet paper and trowel", category: "Personal Care" },
        { name: "Garbage bags", category: "Tools" },
        { name: "Repair kit for gear", category: "Tools" },
        { name: "Camp shoes", category: "Clothing" },
        { name: "Towel (quick-dry)", category: "Personal Care" }
    ];

    const multiDayItems = [
        { name: "Extra batteries or power bank", category: "Tools" },
        { name: "More comprehensive first aid supplies", category: "Safety" },
        { name: "Duct tape (for repairs)", category: "Tools" },
        { name: "Trekking poles", category: "Essential Gear" },
        { name: "Gaiter (for stream crossings)", category: "Clothing" },
        { name: "Dry bags or waterproof stuff sacks", category: "Essential Gear" },
        { name: "Detailed route information", category: "Documents" },
        { name: "Emergency shelter (space blanket)", category: "Safety" }
    ];

    const seasonalItems = {
        'summer': [
            { name: "Extra sun protection", category: "Personal Care" },
            { name: "Light, breathable clothing", category: "Clothing" },
            { name: "Extra water capacity", category: "Food & Water" }
        ],
        'fall': [
            { name: "Warmer mid-layer (fleece)", category: "Clothing" },
            { name: "Gloves", category: "Clothing" },
            { name: "Warm hat", category: "Clothing" }
        ],
        'winter': [
            { name: "Insulated jacket", category: "Clothing" },
            { name: "Thermal base layers", category: "Clothing" },
            { name: "Winter hat and gloves", category: "Clothing" },
            { name: "Insulated, waterproof boots", category: "Clothing" },
            { name: "Snow gear (snowshoes, crampons) if needed", category: "Essential Gear" },
            { name: "Hand/foot warmers", category: "Safety" },
            { name: "Thermal water bottle", category: "Food & Water" }
        ],
        'spring': [
            { name: "Rain pants", category: "Clothing" },
            { name: "Waterproof gloves", category: "Clothing" },
            { name: "Extra socks", category: "Clothing" },
            { name: "Gaiters", category: "Clothing" }
        ]
    };
    
    let checklist = [...essentials];
    
    if (hikeType === 'overnight' || hikeType === 'multi-day') {
        checklist = [...checklist, ...overnightItems];
    }
    
    if (hikeType === 'multi-day') {
        checklist = [...checklist, ...multiDayItems];
    }
    
    if (seasonalItems[season]) {
        checklist = [...checklist, ...seasonalItems[season]];
    }
    
    checklist.sort((a, b) => a.category.localeCompare(b.category));
    
    return checklist;
}

function displayChecklist(checklist, container) {

    const categorizedItems = {};
    
    checklist.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });
    
    let html = `<div class="checklist">`;
    
    Object.keys(categorizedItems).sort().forEach(category => {
        html += `
            <div class="checklist-category">
                <h3>${category}</h3>
                <ul>
        `;
        
        categorizedItems[category].forEach(item => {
            html += `
                <li>
                    <label>
                        <input type="checkbox" name="item" value="${item.name}">
                        ${item.name}
                    </label>
                </li>
            `;
        });
        
        html += `
                </ul>
            </div>
        `;
    });
    
    html += `</div>`;
    
    container.innerHTML = html;
    
    addCheckboxListeners();
}

function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="item"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    updateProgress();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="item"]');
    const totalItems = checkboxes.length;
    const checkedItems = document.querySelectorAll('input[type="checkbox"][name="item"]:checked').length;
    
    const checklistContainer = document.getElementById('checklist-container');
    
    let progressSection = document.querySelector('.checklist-progress');
    
    if (!progressSection && checklistContainer) {
        progressSection = document.createElement('div');
        progressSection.className = 'checklist-progress';
        checklistContainer.prepend(progressSection);
    }
    
    if (progressSection) {
        const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
        
        progressSection.innerHTML = `
            <h3>Packing Progress: ${percentage}%</h3>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
            <p>${checkedItems} of ${totalItems} items packed</p>
        `;
    }
}

function saveChecklist() {

    const checkedItems = Array.from(document.querySelectorAll('input[type="checkbox"][name="item"]:checked'))
        .map(input => input.value);
    

    
    alert(`Your checklist with ${checkedItems.length} checked items has been saved! In a complete application, this would be stored to your account.`);
    
}

function setupSeasonalTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const seasonPanels = document.querySelectorAll('.season-panel');

    const loadImagesForPanel = (panel) => {
        const images = panel.querySelectorAll('img.lazy-load');
        images.forEach(img => {
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
        });
    };

    const activatePanel = (season) => {

        tabButtons.forEach(btn => btn.classList.remove('active'));
        seasonPanels.forEach(panel => panel.classList.remove('active'));

        const activeButton = document.querySelector(`[data-season="${season}"]`);
        const activePanel = document.getElementById(`${season}-content`);
        
        if (activeButton && activePanel) {
            activeButton.classList.add('active');
            activePanel.classList.add('active');
            loadImagesForPanel(activePanel);
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const season = button.dataset.season;
            activatePanel(season);
        });
    });

    activatePanel('summer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('.season-panel img.lazy-load').forEach(img => {
        observer.observe(img);
    });
}