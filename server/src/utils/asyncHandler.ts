// WHY DO WE NEED THIS?
//
// When you write an async route handler like this:
//
//   router.get('/', async (req, res) => {
//       const users = await fetchAllUsers();  // what if this throws?
//       res.send(users);
//   });
//
// If fetchAllUsers() throws an error, Express does NOT catch it automatically.
// The server just hangs — no response, no error message, nothing.
//
// The fix without asyncHandler — you'd have to write try/catch in EVERY controller:
//
//   router.get('/', async (req, res, next) => {
//       try {
//           const users = await fetchAllUsers();
//           res.send(users);
//       } catch (err) {
//           next(err);  // manually pass error to errorHandler
//       }
//   });
//
// That's repetitive. asyncHandler wraps any async function and adds .catch(next)
// automatically — so errors flow to the global errorHandler without any try/catch boilerplate.
//
// USAGE:
//   router.get('/', asyncHandler(getAllUsers));   // clean!
import {
    Request,
    Response,
    NextFunction
} from 'express';

export const asyncHandler =
    (
        fn: Function
    ) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            Promise.resolve(
                fn(req, res, next)
            ).catch(next);
        };
