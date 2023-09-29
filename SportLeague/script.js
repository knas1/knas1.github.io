        const searchInput = document.getElementById('searchInput');
        const championshipCheckbox = document.getElementById('championshipCheckbox');
        const table = document.getElementById('standingsTable');
        const tableRows = table.getElementsByTagName('tr');

        searchInput.addEventListener('input', filterTable);

        // Event listener for championship checkbox
        championshipCheckbox.addEventListener('change', filterTable);

        function filterTable() {
            const searchText = searchInput.value.toLowerCase();
            const showChampionsOnly = championshipCheckbox.checked;

            for (let i = 1; i < tableRows.length; i++) {
                const row = tableRows[i];
                const teamName = row.cells[0].textContent.toLowerCase().split('-').join("");
                const championships = parseInt(row.cells[3].textContent);

                if ((teamName.includes(searchText)) && (!showChampionsOnly || championships > 0)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }

            }
        }
