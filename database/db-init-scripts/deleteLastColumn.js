const fs = require('fs');

// Function to delete the last column of a CSV file
const deleteLastColumn = (filePath) => {
    // Read the CSV file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Split the CSV data into rows
        const rows = data.split('\n');

        // Iterate through each row
        const modifiedRows = rows.map(row => {
            // Split the row into columns
            const columns = row.split(',');

            // Remove the last column
            columns.pop();

            // Join the columns back into a row
            return columns.join(',');
        });

        // Join the modified rows back into CSV data
        const modifiedData = modifiedRows.join('\n');

        // Write the modified CSV data back to the file
        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Last column deleted successfully.');
        });
    });
};

// Usage: Provide the file path as an argument when running the script
if (process.argv.length !== 3) {
    console.error('Usage: node delete_last_column.js filename.csv');
    process.exit(1);
}

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Call the function to delete the last column
deleteLastColumn(filePath);
