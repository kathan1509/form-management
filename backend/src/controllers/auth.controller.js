class AuthController {
    constructor(userModel, jwt, bcrypt) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    async register(req, res) {
        const { username, password, role } = req.body;

        try {
            console.log("Request body:", req.body); // Log request body
            const hashedPassword = await this.bcrypt.hash(password, 10);
            console.log("Hashed password:", hashedPassword); // Log hashed password

            // Pass a callback function to handle the result
            this.userModel.create({ username, password: hashedPassword, role }, (err, newUser) => {
                if (err) {
                    console.error("Error during user creation:", err); // Log error
                    return res.status(500).json({ message: "Error registering user", error: err.message });
                }
                console.log("New user created:", newUser); // Log new user
                res.status(201).json({ message: "User registered successfully", user: newUser });
            });
        } catch (error) {
            console.error("Error during registration:", error); // Log error
            res.status(500).json({ message: "Error registering user", error: error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Pass a callback function to handle the result
            this.userModel.findByUsername(username, (err, user) => {
                if (err) {
                    console.error("Error finding user:", err); // Log error
                    return res.status(500).json({ message: "Error logging in", error: err.message });
                }

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                // Compare passwords
                this.bcrypt.compare(password, user.password, (compareErr, isPasswordValid) => {
                    if (compareErr || !isPasswordValid) {
                        return res.status(401).json({ message: "Invalid password" });
                    }

                    // Generate JWT token
                    const token = this.jwt.sign(
                        { id: user.id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({ message: "Login successful", token });
                });
            });
        } catch (error) {
            console.error("Error during login:", error); // Log error
            res.status(500).json({ message: "Error logging in", error: error.message });
        }
    }
}

export default AuthController;