"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const port = process.env.PORT || 3333;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use('/files', express_1.default.static(node_path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        // se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`));
