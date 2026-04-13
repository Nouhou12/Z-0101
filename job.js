document.addEventListener('DOMContentLoaded', loadJobs);
async function loadJobs() {
    const sheetId = "16MQTQ_dBYM-0zDP71b0T8-KikTFTQgxrYeCEwImohUk";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const res = await fetch(url);
    const text = await res.text();

    const rows = text.split("\n").slice(1); // skip header

    const container = document.getElementById('jobs');
    container.innerHTML = "";

    console.log(rows);

    rows.forEach(row => {
        const cols = row.split(",").map(col => col.replace(/^"|"$/g, '').trim());

        const title = cols[1];
        const description = cols[2];
        const payment = cols[3];
        const contact = cols[4];
        const offercomplete = cols[5];


        if (!title) return;

        if (offercomplete.toLowerCase() === "oui") return;

        const div = document.createElement('div');
        div.classList.add('job');

        div.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>${payment}</p>
            <a href="mailto:${contact}" class="button">Contact: ${contact}</a>
        `;

        container.appendChild(div);
    });
}