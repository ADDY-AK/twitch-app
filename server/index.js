const PORT = 8000;
const express = require('express');
const app = express();

app.listen(PORT, () => console.log(`server running on port ${PORT}`));