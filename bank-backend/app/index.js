import Server from "./src/server.js";
function main() {
    const server = new Server(4000); 
    server.start();
}
main();
