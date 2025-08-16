import { setupServer } from "msw/node";
import handlers from "./handles"; // default import

export const server = setupServer(...handlers);
