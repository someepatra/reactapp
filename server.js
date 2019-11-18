// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const app = express();
const port = 3000;

// =======================================
//              MIDDLEWARE
// =======================================
//Body Parser
app.use(express.urlencoded({ extended: false }));

// =======================================
//              Routes
// =======================================
app.get('/reactApp', (req,res) => {
    res.send("welcome");
});


// =======================================
//              LISTENER
// =======================================
app.listen(port, () => {
    console.log('Server is running on port 3000');
});