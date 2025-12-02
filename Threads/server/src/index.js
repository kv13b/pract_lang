import express from 'express';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
});
app.listen(PORT, () => console.log(`server started at port :${PORT}`));
//# sourceMappingURL=index.js.map