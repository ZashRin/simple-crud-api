import http from 'http';
import { envConfig } from './services/config.service';
import { MethodType } from './services/server.service';
import { createUser, deleteUser, getAllUsers, getUserByID, updateUser } from './User/requests';


const port = envConfig.SERVER_PORT;

const startPoint = '/api/users';

const SERVER_ROUTES = {
    GET: getUserByID,
    POST: createUser,
    DELETE: deleteUser,
    PUT: updateUser
}

const server = http.createServer(async (req, res) => {
    const method = req.method as MethodType;
    const url: string | undefined = req.url;
    try {
        if (url?.startsWith(startPoint)) {
            if (method === 'GET' && url === startPoint) await getAllUsers(req, res);
            else {
                await SERVER_ROUTES[method](req, res)
            };
        } else {
            throw new Error('NotFound');
        }
    } catch (err) {
        console.log(err);
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
