// --- Tailwind Configuration (Must be defined here since it is JS) ---
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#121230', //atlas surrounding bar colour
                'secondary': '#4fc9b3ff', // text of mussoorie landour rishikesh
                'accent': '#0a155fff', //configure button colour
                'background': '#141505ff', 
                'card-bg': 'rgba(28, 32, 12, 0.33)',
                'card-bg-light': 'rgba(14, 9, 79, 0.85)',//search colour
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
}

// --- DESTINATION DATA ---
const destinations = {
    "Mussoorie": {
        tagline: "The Queen of the Hills, offering spectacular views of the Shivalik ranges.",
        imagePlaceholder: "Mussoorie.png",
        itinerary: [
            "Day 1: Explore Mall Road, visit Gun Hill via cable car.",
            "Day 2: Trek to Lal Tibba (highest point) and visit Kempty Falls.",
            "Day 3: Sightseeing at Company Garden and return journey."
        ],
        routes: [
            { title: "Popular Route", detail: "Mall Road to Landour, a scenic walk past colonial architecture." },
            { title: "Major Attractions", detail: "Gun Hill (Ropeway cost: ₹150), Kempty Falls (Free), Lal Tibba (Entry ₹20)." }
        ],
        events: [
            { title: "Winterline Carnival", detail: "Dec 25 - Jan 1. Location: Mall Road. Cultural performances and food stalls." },
            { title: "Flower Show", detail: "Seasonal at Company Garden. Exhibition of Himalayan flowers." }
        ],
        blogs: [
            { title: "Must-Try Street Food on Mall Road", cost: "₹50 - ₹200", review: "Best local Chaat and Momos reviewed." },
            { title: "The Cost of a Weekend Trip", cost: "₹4000 - ₹15000", review: "Detailed budget breakdown for budget and luxury stays." }
        ],
        realtime: {
            weather: { temp: '14°C', condition: 'Foggy', precip: '10%' },
            flow: { level: 'High', color: 'text-red-400', recommendation: 'Visit attractions before 10 AM to avoid peak congestion.' },
            landslide: { active: true, message: 'DANGER: Road closure near Kempty Falls due to heavy rain. Use alternative route via Cart Road.' }
        }
    },
    "Landour": {
        tagline: "A peaceful cantonment town, known for its old-world charm and quiet forests.",
        imagePlaceholder: "Landour.png",
        itinerary: [
            "Day 1: Walk the scenic Char Dukan-Landour Clock Tower loop.",
            "Day 2: Visit St. Paul's Church and enjoy panoramic views from Lal Tibba.",
            "Day 3: Relax, read a book, and savor the quiet atmosphere."
        ],
        routes: [
            { title: "Popular Route", detail: "Char Dukan loop walk. Limited vehicle access, ideal for walking." },
            { title: "Major Attractions", detail: "Char Dukan (Snacks), Sister's Bazaar, St. Paul's Church." }
        ],
        events: [
            { title: "Book Reading Sessions", detail: "Occasional events at local bookstores/cafes. Check notice boards." },
            { title: "Birdwatching Season", detail: "Year-round quiet spot for viewing Himalayan bird species." }
        ],
        blogs: [
            { title: "Best Quiet Cafes in Landour", cost: "₹300 - ₹700", review: "Reviews of cozy cafes and bakeries." },
            { title: "A History Walk through Landour", cost: "Free", review: "Guide to historical homes and landmarks." }
        ],
        realtime: {
            weather: { temp: '12°C', condition: 'Partly Cloudy', precip: '5%' },
            flow: { level: 'Low', color: 'text-secondary', recommendation: 'Perfect time for a peaceful walk; no congestion expected.' },
            landslide: { active: false, message: 'Roads clear but approach roads to Mussoorie may have delays.' }
        }
    },
    "Rishikesh": {
        tagline: "The Yoga Capital of the World, situated on the banks of the sacred River Ganga.",
        imagePlaceholder: "Rishikesh.png",
        itinerary: [
            "Day 1: River rafting adventure on the Ganga.",
            "Day 2: Attend a Yoga session and visit the iconic Lakshman Jhula.",
            "Day 3: Explore the Beatles Ashram and enjoy the evening Ganga Aarti."
        ],
        routes: [
            { title: "Popular Route", detail: "Walk or bike between Ram Jhula and Lakshman Jhula." },
            { title: "Major Attractions", detail: "Lakshman Jhula, Ram Jhula, The Beatles Ashram (Entry ₹150), White Water Rafting." }
        ],
        events: [
            { title: "International Yoga Festival", detail: "Annually in March. Major event attracting global attendees." },
            { title: "Ganga Aarti", detail: "Daily at sunset at Parmarth Niketan. Highly recommended." }
        ],
        blogs: [
            { title: "The Ultimate Guide to Rishikesh Rafting", cost: "₹800 - ₹2500", review: "Reviews of different rafting stretches and operators." },
            { title: "Finding Peace in the Yoga Capital", cost: "₹500/day (budget stay)", review: "Tips for solo travelers and ashram stays." }
        ],
        realtime: {
            weather: { temp: '26°C', condition: 'Clear Skies', precip: '0%' },
            flow: { level: 'Moderate', color: 'text-yellow-400', recommendation: 'Book rafting slots in advance, and plan to arrive at Aarti early.' },
            landslide: { active: false, message: 'Roads are clear, but bridge traffic is heavy near Lakshman Jhula.' }
        }
    }
};

let currentDestinationName = "Mussoorie";
let currentDestinationData = destinations[currentDestinationName];
let activeSection = 'welcome';

function getDestination(name) {
    if (!name) return null;
    const normalizedName = name.toLowerCase().trim();
    for (const key in destinations) {
        if (key.toLowerCase() === normalizedName) {
            return destinations[key];
        }
    }
    return null;
}

function updateContent(destinationName, data) {
    const container = document.getElementById('main-content-area');
    const placeholder = document.getElementById('placeholder-message');
    currentDestinationName = destinationName;
    currentDestinationData = data;

    if (!data) {
        container.classList.add('hidden');
        placeholder.classList.remove('hidden');
        placeholder.innerHTML = `<h2 class="text-xl font-semibold text-red-500">Destination Not Found</h2><p class="text-gray-400 mt-2">Could not find data for "${destinationName}". Try Mussoorie, Landour, or Rishikesh.</p>`;
        return;
    }

    placeholder.classList.add('hidden');
    container.classList.remove('hidden');

    // --- Update Core Header ---
    document.getElementById('dest-title').textContent = currentDestinationName.toUpperCase();
    document.getElementById('dest-tagline').textContent = data.tagline;
    document.getElementById('dest-image').src = data.imagePlaceholder;
    document.getElementById('dest-image').alt = `Scenic image of ${currentDestinationName}`;
    
    // --- Update Simulated Data ---
    updateSimulatedData(data);

    // --- Update Itinerary Section ---
    const itineraryList = document.getElementById('itinerary-list');
    itineraryList.innerHTML = data.itinerary.map((item, index) => `
        <li class="flex items-start mb-3 bg-card-bg-light p-3 rounded-lg border-l-4 border-secondary shadow-md">
            <span class="text-secondary font-bold mr-3">${index + 1}.</span>
            <span class="text-gray-200">${item}</span>
        </li>
    `).join('');

    // --- Update Routes/Attractions Section ---
    const routesList = document.getElementById('routes-list');
    routesList.innerHTML = data.routes.map(item => `
        <div class="p-4 bg-card-bg-light rounded-lg shadow-md border-t border-gray-600">
            <h3 class="font-semibold text-accent mb-1">${item.title}</h3>
            <p class="text-sm text-gray-300">${item.detail}</p>
        </div>
    `).join('');

    // --- Update Events Section ---
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = data.events.map(item => `
        <div class="p-4 bg-card-bg-light rounded-lg shadow-md border-l-4 border-secondary">
            <h3 class="font-semibold text-secondary mb-1">${item.title}</h3>
            <p class="text-sm text-gray-300">${item.detail}</p>
        </div>
    `).join('');

    // --- Update Blogs/Reviews Section ---
    const blogPreview = document.getElementById('blog-preview-container');
    blogPreview.innerHTML = data.blogs.map(blog => `
        <div class="p-4 bg-card-bg-light rounded-lg shadow-inner border border-gray-600">
            <h4 class="font-semibold text-lg text-accent">${blog.title}</h4>
            <p class="text-sm text-gray-400 mt-1">**Cost Est.:** <span class="font-mono">${blog.cost}</span></p>
            <p class="text-sm text-gray-300 line-clamp-3 mt-2">${blog.review}</p>
            <a href="#" class="text-secondary text-sm mt-2 inline-block hover:underline">Read More &rarr;</a>
        </div>
    `).join('');
    
    // Recreate Lucide icons for the newly injected content
    lucide.createIcons();
    
    // Show the initial section
    showSection(activeSection); 
}

function handleSearch() {
    const input = document.getElementById('destination-input');
    const destName = input.value.trim();
    const data = getDestination(destName);
    updateContent(destName, data);
}

// --- SECTION SWITCHING LOGIC ---
function showSection(sectionId) {
    activeSection = sectionId;
    // Hide all content sections and remove active class from buttons
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('opacity-100', 'translate-y-0');
    });
    document.querySelectorAll('.feature-button').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-secondary', 'bg-opacity-90');
        btn.classList.add('bg-card-bg-light');
    });

    // Show the requested section with a transition
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        setTimeout(() => {
            targetSection.classList.add('opacity-100', 'translate-y-0');
        }, 10);
    }
    
    // Highlight the corresponding button
    const targetButton = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (targetButton) {
        targetButton.classList.add('ring-4', 'ring-secondary');
        targetButton.classList.remove('bg-card-bg-light'); // Remove lighter bg when active
    } else {
         // Ensure the Welcome section button is highlighted if no feature button matches (e.g., initial load)
         const welcomeBtn = document.querySelector(`[data-section-id="welcome"]`);
         welcomeBtn?.classList.add('ring-4', 'ring-secondary');
         welcomeBtn?.classList.remove('bg-card-bg-light');
    }
    
    // Update the weather and landslide data when switching sections if needed
    updateSimulatedData(currentDestinationData);
}

// --- SIMULATED REAL-TIME DATA FUNCTIONS ---

function updateSimulatedData(data) {
    if (!data) return;

    // 1. Landslide Alert
    const alertContainer = document.getElementById('landslide-alert-container');
    const alertMessage = document.getElementById('landslide-alert-message');
    
    if (data.realtime.landslide.active) {
        alertContainer.className = 'mt-4 md:mt-0 p-2 px-4 rounded-full font-semibold transition-all duration-500 shadow-lg text-white bg-red-700 animate-pulse text-center';
        alertMessage.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5"></i> <span>${data.realtime.landslide.message}</span>`;
    } else {
        alertContainer.className = 'mt-4 md:mt-0 p-2 px-4 rounded-full font-semibold transition-all duration-500 shadow-lg text-white bg-secondary/70 text-center';
        alertMessage.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5"></i> <span>Roads Clear - ${data.realtime.landslide.message}</span>`;
    }
    lucide.createIcons();

    // 2. Weather Details
    const weatherDetails = document.getElementById('weather-details');
    const detailedForecast = document.getElementById('detailed-weather-forecast');
    
    weatherDetails.innerHTML = `
        <p class="text-5xl font-bold text-white">${data.realtime.weather.temp}</p> 
        <p class="text-sm text-gray-300 mt-1">${data.realtime.weather.condition}</p>
        <div class="mt-2 text-xs text-gray-400 space-y-1">
            <p>Precipitation: ${data.realtime.weather.precip}</p>
        </div>
    `;
    
    // Simple detailed forecast simulation (3 days)
    const forecastDays = [
        { day: 'Today', temp: data.realtime.weather.temp, condition: data.realtime.weather.condition },
        { day: 'Tomorrow', temp: (parseInt(data.realtime.weather.temp) + 1) + '°C', condition: 'Sunny' },
        { day: 'Day 3', temp: (parseInt(data.realtime.weather.temp) - 2) + '°C', condition: 'Cloudy' },
    ];
    
    detailedForecast.innerHTML = forecastDays.map(day => `
        <div class="p-4 bg-card-bg-light/80 rounded-lg shadow-sm border border-gray-600">
            <p class="font-semibold text-secondary">${day.day}</p>
            <p class="text-2xl font-bold text-white">${day.temp}</p>
            <p class="text-sm text-gray-300">${day.condition}</p>
        </div>
    `).join('');

    document.getElementById('weather-api-status').textContent = 'Weather data simulated based on destination profile. Live API integration required for real-time updates.';


    // 3. Tourist Flow Prediction
    document.getElementById('flow-level').textContent = data.realtime.flow.level;
    document.getElementById('flow-level').className = `text-4xl font-bold ${data.realtime.flow.color}`;
    document.getElementById('flow-recommendation').textContent = data.realtime.flow.recommendation;

}

// --- SENTIMENT ANALYSIS ---
function analyzeSentiment() {
    const input = document.getElementById('feedback-input').value.trim();
    const output = document.getElementById('sentiment-text');

    if (input.length < 10) {
        output.textContent = 'Please provide more details for a meaningful analysis.';
        output.parentElement.className = 'mt-6 p-4 bg-card-bg-light rounded-xl shadow-inner border-l-4 border-yellow-400';
        return;
    }

    // Simple Keyword-based sentiment simulation
    let sentiment = 'Neutral';
    let color = 'border-accent';

    if (input.toLowerCase().includes('great') || input.toLowerCase().includes('love') || input.toLowerCase().includes('excellent') || input.toLowerCase().includes('beautiful') || input.toLowerCase().includes('clear road')) {
        sentiment = 'Highly Positive (95% Confidence)';
        color = 'border-secondary';
    } else if (input.toLowerCase().includes('poor') || input.toLowerCase().includes('bad') || input.toLowerCase().includes('traffic') || input.toLowerCase().includes('dirty') || input.toLowerCase().includes('landslide')) {
        sentiment = 'Highly Negative (88% Confidence)';
        color = 'border-red-500';
    }

    output.textContent = `User Sentiment: ${sentiment}. Thank you for helping us improve!`;
    output.parentElement.className = `mt-6 p-4 bg-card-bg-light rounded-xl shadow-inner border-l-4 ${color}`;
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state to Mussoorie
    updateContent("Mussoorie", destinations["Mussoorie"]);

    // Event listener for button click and Enter key
    document.getElementById('search-button').addEventListener('click', handleSearch);
    document.getElementById('destination-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Recreate Lucide icons for static elements
    lucide.createIcons();
});
