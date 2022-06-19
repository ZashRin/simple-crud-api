import { NotFoundError } from '../ErrorHandler/errors';
import { HandleError } from '../ErrorHandler/handler';
import { RouterCallbackFunction } from '../services/server.service';
import { getUsers, searchUser, createUser as create, removeUser, updateUser as update } from '../services/user.service';

const header = { 'Content-Type': 'application/json' };
const base = '/api/users/'.length;

const getAllUsers: RouterCallbackFunction = async (req, res) => {
    try {
        const users = await getUsers();
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    } catch (err) {
        HandleError(req, res, err);
    }
};

const createUser: RouterCallbackFunction = async (req, res) => {
    if (req.url !== '/api/users') throw new NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        try {
            const userData = JSON.parse(data);
            const newUser = await create(userData);
            res.writeHead(201, header);
            res.end(JSON.stringify(newUser));
        } catch (err) {
            HandleError(req, res, err);
        }
    });
}

const deleteUser: RouterCallbackFunction = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring(base);
        await removeUser(userId as string);
        res.writeHead(204, header);
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}

const updateUser: RouterCallbackFunction = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        try {
            const userData = JSON.parse(data);
            const url = req.url;
            const userId = url?.substring(base);
            await update(userId as string, userData);
            res.writeHead(200, header);
            res.end(JSON.stringify(userData));
        } catch (err) {
            HandleError(req, res, err);
        }
    });
}

const getUserByID: RouterCallbackFunction = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring(base);
        const currentUser = searchUser(userId as string);
        res.writeHead(200, header);
        res.end(JSON.stringify(currentUser));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export { getAllUsers, createUser, deleteUser, updateUser, getUserByID };
