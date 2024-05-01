const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

// Endpoint to fetch the file component
app.get('/fileComponent/:fileName', (req, res) => {
    const { fileName } = req.params;
    // Here you can dynamically generate the component code based on the file name
    const componentCode = `
        function FileComponent() {
            return (
                <div>
                    <FaFilePdf color='red' size={80} />
                    <Text fontWeight={'bold'}>${fileName}</Text>
                </div>
            );
        }
        export default FileComponent;
    `;
    res.send(componentCode);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
