document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const sheetId = "1m1At1nq4GiobfB5D-l0ilSxWHw4f2KjPmzX35uFpJvU";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau : " + response.status);
            return response.text();
        })
        .then(csv => {
            // console.log("Données CSV :", csv);
            const lignes = csv.trim().split('\n');

            lignes.forEach((ligne, index) => {
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
                nom.textContent = colonnes[2] || 'Nom inconnu';

                const description = document.createElement('div');
                description.textContent = `${colonnes[3] || 'Description'}`;

                const auteur = document.createElement('div');
                auteur.className = 'author';
                auteur.textContent = `Auteur — ${colonnes[4] || 'Auteur inconnu'}`;

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
                block.appendChild(contact);
                block.appendChild(lien);

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
    // Debug Test
    console.log("Testing");
    let i;
    for (i = 0;i <= 3;i++) {
        const block = document.createElement('div');
        block.classList.add('project-block');

        const image = document.createElement('img');
        image.src = '#';
        image.style.width = "400px";    // Ajustez selon vos besoins
        image.style.display = "block";  // Pour éviter l'affichage inline
        image.style.marginLeft = 'auto';
        image.style.marginRight = 'auto';


        const nom = document.createElement('strong');
        nom.textContent = 'Nom inconnu'+i;

        const description = document.createElement('div');
        description.textContent = 'Description';

        const auteur = document.createElement('div');
        auteur.className = 'author';
        auteur.textContent = 'Auteur inconnu';

        const contact = document.createElement('a');
        contact.textContent = 'Contacter l’auteur';
        contact.href = "#";
        contact.target = '_blank';
        contact.rel = 'noopener noreferrer';
        contact.className = 'button';

        const lien = document.createElement('a');
        lien.textContent = 'Voir le projet';
        lien.href =  '#';
        lien.target = '_blank';
        lien.rel = 'noopener noreferrer';
        lien.className = 'button';

        block.appendChild(image);
        block.appendChild(nom);
        block.appendChild(description);
        block.appendChild(auteur);
        block.appendChild(contact);
        block.appendChild(lien);

        main.appendChild(block);
    }
    

});