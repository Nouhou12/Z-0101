/*document.addEventListener('DOMContentLoaded', loadFeaturedProject);

function loadFeaturedProject() {
    const main = document.querySelector('main');
    const sheetId = "1q1uGNjUqtJlRmGUCTDpWVjTghjy7137jT_L1JClEAjs";
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    function getUTCNow() {
        return new Date(Date.now());
    }
    const serverNow = getUTCNow();

    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau : " + response.status);
            return response.text();
        })
        .then(csv => {
            const lignes = csv.trim().split('\n');

            lignes.forEach((ligne, index) => {
                if (index === 0) return; // Ignorer l'en-tête
                let colonnes = ligne.split(',');

                colonnes = colonnes.map(val => val.replace(/^"|"$/g, '').trim());

                const name = colonnes[0] || 'Nom inconnu';
                const duration = Number(colonnes[1]);
                const link = colonnes[2] || '#';
                const image = colonnes[3] || '';

                if (!Number.isFinite(duration)) return;

                const endDate = new Date(serverNow);
                endDate.setUTCHours(endDate.getUTCHours() + duration);

                const block = document.createElement('div');
                block.classList.add('offer');
                block.id = name.replace(/\s+/g, '-').toLowerCase();

                if (image !== '') {
                    const imgEl = document.createElement('img');
                    imgEl.src = image;
                    imgEl.style.width = "400px";
                    imgEl.style.display = "block";
                    imgEl.style.marginLeft = "auto";
                    imgEl.style.marginRight = "auto";
                    block.appendChild(imgEl);
                }

                const title = document.createElement('strong');
                title.textContent = name;

                const countdown = document.createElement('div');
                countdown.className = 'countdown';
                countdown.dataset.end = endDate.toISOString();
                block.appendChild(countdown);

                main.appendChild(block);
            });

            // 🔔 Lancer le compteur après avoir ajouté tous les blocs
            startCountdown();
            setInterval(startCountdown, 1000);

        })
        .catch(error => {
            console.error('Erreur :', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Impossible de charger les données.";
            main.appendChild(errorMsg);
        });

    document.dispatchEvent(new Event("offersLoaded"));
}

// 5️⃣ Moteur de recherche
document.addEventListener("offersLoaded", searchOffers);
setTimeout(searchOffers, 1000);

function searchOffers() {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const offers = document.querySelectorAll(".offer strong");

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        offers.forEach(offer => {
            const text = offer.textContent.toLowerCase();
            offer.parentElement.style.display = text.includes(query) ? "block" : "none";
        });
    }

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("input", performSearch);
}

// 🔔 Fonction de mise à jour des compteurs
function startCountdown() {
    const now = Date.now();
    document.querySelectorAll(".countdown").forEach(el => {
        const end = Date.parse(el.dataset.end);
        const diff = end - now;

        if (diff <= 0) {
            el.textContent = "⛔ Offre expirée";
            return;
        }

        const h = Math.floor(diff / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1000);

        el.textContent = `${h}h ${m}m ${s}s`;
    });
}
*/
document.addEventListener('DOMContentLoaded', loadFeaturedProject);

async function loadFeaturedProject() {
    const main = document.querySelector('main');
    const sheetId = "1q1uGNjUqtJlRmGUCTDpWVjTghjy7137jT_L1JClEAjs";
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    // 1️⃣ Obtenir l'heure serveur via l'en-tête HTTP
    async function getServerUTC() {
        try {
            const response = await fetch(sheetUrl, { method: "HEAD" });
            const dateHeader = response.headers.get('Date');
            if (!dateHeader) throw new Error("En-tête Date introuvable");
            return new Date(dateHeader);
        } catch (err) {
            console.warn("Impossible de récupérer l'heure serveur, fallback locale :", err);
            return new Date(); // fallback local
        }
    }

    const serverNow = await getServerUTC();

    // 2️⃣ Charger le CSV
    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau : " + response.status);
            return response.text();
        })
        .then(csv => {
            const lignes = csv.trim().split('\n');

            lignes.forEach((ligne, index) => {
                if (index === 0) return; // Ignorer l'en-tête
                let colonnes = ligne.split(',');
                colonnes = colonnes.map(val => val.replace(/^"|"$/g, '').trim());

                const name = colonnes[0] || 'Nom inconnu';
                const duration = Number(colonnes[1]);
                const link = colonnes[2] || '#';
                const image = colonnes[3] || '';

                if (!Number.isFinite(duration)) return;

                // 3️⃣ Calcul date de fin UTC à partir de l'heure serveur
                const endDate = new Date(colonnes[4]);
                endDate.setUTCHours(endDate.getUTCHours() + duration);

                // 4️⃣ Création HTML
                const block = document.createElement('div');
                block.classList.add('offer');
                block.id = name.replace(/\s+/g, '-').toLowerCase();

                if (image !== '') {
                    const imgEl = document.createElement('img');
                    imgEl.src = image;
                    imgEl.style.width = "400px";
                    imgEl.style.display = "block";
                    imgEl.style.marginLeft = "auto";
                    imgEl.style.marginRight = "auto";
                    block.appendChild(imgEl);
                }

                const title = document.createElement('strong');
                title.textContent = name;

                const countdown = document.createElement('div');
                countdown.className = 'countdown';
                countdown.dataset.end = endDate.toISOString();
                block.appendChild(countdown);

                main.appendChild(block);
            });

            // 🔔 Lancer le compteur après ajout des blocs
            startCountdown();
            setInterval(startCountdown, 1000);

        })
        .catch(error => {
            console.error('Erreur :', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Impossible de charger les données.";
            main.appendChild(errorMsg);
        });

    document.dispatchEvent(new Event("offersLoaded"));
}

// 5️⃣ Moteur de recherche
document.addEventListener("offersLoaded", searchOffers);
setTimeout(searchOffers, 1000);

function searchOffers() {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const offers = document.querySelectorAll(".offer strong");

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        offers.forEach(offer => {
            const text = offer.textContent.toLowerCase();
            offer.parentElement.style.display = text.includes(query) ? "block" : "none";
        });
    }

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("input", performSearch);
}

// 🔔 Fonction de mise à jour des compteurs
function startCountdown() {
    const now = Date.now();
    document.querySelectorAll(".countdown").forEach(el => {
        const end = Date.parse(el.dataset.end);
        const diff = end - now;

        if (diff <= 0) {
            el.textContent = "⛔ Offre expirée";
            return;
        }

        const h = Math.floor(diff / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1000);

        el.textContent = `${h}h ${m}m ${s}s`;
    });
}
