class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userService.findUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await this.userService.deleteUser(userId);
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default UserController;