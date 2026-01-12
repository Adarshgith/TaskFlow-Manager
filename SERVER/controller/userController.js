import User from "../model/userModule.js";

// Create a new user
export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const savedUser = await newUser.save();
    // res.status(200).json(savedUser);
    res
      .status(200)
      .json({ message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (userData || userData.length === 0) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "No users found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res
      .status(200).json({ message: "User Updated successfully"});
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
