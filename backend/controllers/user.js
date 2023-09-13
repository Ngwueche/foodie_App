import UserModel from "../Model/User.js";
import bcrypt from "bcrypt";

const salt = 10;
export const createUserController = async (req, res) => {
  const user = req.body;
  UserModel.findOne({ email: user.email }, async (err, result) => {
    if (result) {
      res.send({ message: "This email already exist", alert: false });
    } else {
      const { firstName, lastName, email, password, confirmPassword, image } =
        req.body;
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
      }
      // Hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create a new user object with the hashed password
      try {
        const newUser = new UserModel({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          image,
        });
        // Save the user to the database
        newUser.save();
        console.log(newUser);
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "An error occurred" });
      }
    }
  });
};

export const getUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
        error: "Invalid password",
        alert: false,
      });
    }
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };
    res.status(201);
    res.json({ message: "Login is successful", alert: true, data: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
