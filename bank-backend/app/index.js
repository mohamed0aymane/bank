// index.js
import Server from "./src/server.js";

// Entry point
function main() {
    const server = new Server(4000); // ou 3000 si vous voulez
    server.start();
}

main();
