document.addEventListener('DOMContentLoaded', loadproject);

function loadproject() {
    const main = document.querySelector('main');
    const sheetId = "1m1At1nq4GiobfB5D-l0ilSxWHw4f2KjPmzX35uFpJvU";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const MAX_PROJECTS = 4; // Ajustable selon vos besoins

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau : " + response.status);
            return response.text();
        })
        .then(csv => {
            // console.log("Données CSV :", csv);
            const lignes = csv.trim().split('\n');

            // Randomize line order
            const data = lignes.slice(1).sort(() => Math.random() - 0.5);

            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }

            // Limiter à N projets
            const selectedProjects = data.slice(0, MAX_PROJECTS);

            selectedProjects.forEach((ligne, index) => {
                if (index === 0) return; // Ignorer l'en-tête éventuel
                let colonnes = ligne.split(',');

                const nettoyé = colonnes.map(val => val.replace(/^"|"$/g, '').trim());
                colonnes = nettoyé;

                const block = document.createElement('div');
                block.classList.add('project-block');
                block.id = colonnes[2];

                const image = document.createElement('img');
                image.src = colonnes[5] || '';
                image.style.width = "400px";    // Ajustez selon vos besoins
                image.style.display = "block";  // Pour éviter l'affichage inline
                image.style.marginLeft = 'auto';
                image.style.marginRight = 'auto';


                const nom = document.createElement('strong');
                nom.className = 'project-name';
                nom.textContent = colonnes[2] || 'Nom inconnu';

                const description = document.createElement('div');
                description.className = 'description';
                description.textContent = `${colonnes[3] || 'Description'}`;

                const auteur = document.createElement('div');
                auteur.className = 'author';
                auteur.textContent = `Auteur — ${colonnes[4] || 'Auteur inconnu'}`;

                const licence = document.createElement('div');
                licence.className = 'licence';
                licence.textContent = `Licence — ${colonnes[7] || 'Licence inconnue'}`;

                const prix = document.createElement('div');
                prix.className = 'price';
                prix.textContent = `Prix — ${colonnes[8] || 'Gratuit'}`;


                const note = document.createElement('div');
                note.className = 'note';
                note.textContent = `Note — ${colonnes[9] || 'Aucune note'}`;

                const contact = document.createElement('a');
                contact.textContent = 'Contacter l’auteur';
                contact.href = "mailto:" + colonnes[1] || '#';
                contact.target = '_blank';
                contact.rel = 'noopener noreferrer';
                contact.className = 'button';

                const lien = document.createElement('a');
                lien.textContent = 'Voir le projet';
                lien.href = colonnes[6] || '#';
                lien.target = '_blank';
                lien.rel = 'noopener noreferrer';
                lien.className = 'button';

                if (colonnes[5] !== '') {
                    block.appendChild(image);
                }
                block.appendChild(nom);
                block.appendChild(description);
                block.appendChild(auteur);
                block.appendChild(licence);
                block.appendChild(prix);
                block.appendChild(contact);
                block.appendChild(lien);
                if (colonnes[9] !== '') {
                    block.appendChild(note);
                }

                main.appendChild(block);
                // console.log("Bloc ajouté :", block.textContent);
                // console.log("Image brute :", colonnes[5]);
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Impossible de charger les données.";
            main.appendChild(errorMsg);
        });
    document.dispatchEvent(new Event("projectsLoaded"));
}