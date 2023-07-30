// Function to fetch and populate the Level data
function fetchLevelData() {
    fetch('../php/get_level_data.php') 
    .then(response => response.json())
    .then(data => {
        const levelData = document.getElementById('levelData');
        levelData.innerHTML = '';

        data.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row.Level}</td>
                <td>${row.spielZeit}</td>
                <td>${row.anzahl_karten}</td>
            `;
            levelData.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error fetching Level data:', error);
    });
}

// Function to fetch and populate the Spiel data
function fetchSpielData() {
    fetch('fetch_spiel_data.php') // Replace 'fetch_spiel_data.php' with the actual PHP script to fetch Spiel data from the database
    .then(response => response.json())
    .then(data => {
        const spielData = document.getElementById('spielData');
        spielData.innerHTML = '';

        data.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row.Datetime}</td>
                <td>${row.level}</td>
                <td>${row.dauer}</td>
                <td>${row.gametyp}</td>
                <td>${row.mitspieler}</td>
                <td>${row.gewinner}</td>
                <td>${row.gameprocess}</td>
            `;
            spielData.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error fetching Spiel data:', error);
    });
}

// Call the functions to fetch and populate the data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchLevelData();
    fetchSpielData();
});
