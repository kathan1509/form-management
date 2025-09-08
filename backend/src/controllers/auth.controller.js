class AuthController {
    constructor(userModel, jwt, bcrypt) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    async register(req, res) {
        const { username, password, role } = req.body;

        try {
            const hashedPassword = await this.bcrypt.hash(password, 10);
            const newUser = await this.userModel.create({ username, password: hashedPassword, role });
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await this.userModel.findByUsername(username);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await this.bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = this.jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", error });
        }
    }
}

export {AuthController};