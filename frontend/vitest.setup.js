import "@testing-library/jest-dom";
import 'whatwg-fetch'; // polyfill fetch
import { server } from "./mockServices/server-msw"


beforeAll(() => {
    console.log("listining");
    server.listen()
});
afterEach(() =>{
    console.log("handelling");
     server.resetHandlers()});
afterAll(() => {
    console.log("Closing");
    server.close()});
