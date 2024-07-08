import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // Define the path to the JSON file
        const filePath = "D:/Exam-emwork/daily-work/src/app/data/formData.json"

        // Read the existing data from the file
        const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
        const jsonData = JSON.parse(fileData);

        // Add the new data to the array
        jsonData.push(data);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        res.status(200).json({ message: 'Data saved successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
