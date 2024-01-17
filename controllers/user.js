const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("../schemas/User");

const { OAuth2Client } = require("google-auth-library");
const oauth2Client = new OAuth2Client();

exports.signup = async (req, res) => {
  try {
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      encryptedPassword: req.body.password,
    };

    // Check if the user already exists
    const userResponse = await User.findOne({ email: userObj.email });

    console.log("A");

    if (userResponse) {
      return res.status(409).json("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userObj.encryptedPassword, 10);

    userObj.encryptedPassword = hashedPassword;

    // Create the user with the hashed password
    console.log("B");
    const newUser = await User.create(userObj);
    console.log("C");

    // Remove password from the response
    const { encryptedPassword, ...userWithoutPassword } = newUser.toObject();

    res.status(200).json({
      message: "User Created Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

//login
exports.login = async (req, res) => {
  try {
    //check if user exists
    const userResponse = await User.findOne({ email: req.body.email });

    if (!userResponse) {
      return res.status(404).json("User does not exists");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userResponse.encryptedPassword
    );

    if (!passwordMatch) {
      return res.status(401).json("Incorrect password"); // Unauthorized
    }

    const { encryptedPassword, ...userWithoutPassword } =
      userResponse.toObject();

    const token = jwt.sign(
      { name: userResponse.name, userId: userResponse._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.forgetPassword = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: "user logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

//microsoft Oauth
exports.msAuth = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
exports.msAuthCallback = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

//Google Oauth
exports.googleAuth = async (req, res) => {
  try {
    // get the code from frontend
    const code = req.body.code;
    console.log("Authorization Code:", code);

    // Exchange the authorization code for an access token
    const response = await axios.post(
      "https://accounts.google.com/o/oauth2/token",
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }
    );
    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);

    // Fetch user details using the access token
    const googleUser = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(googleUser);

    const userResponse = await User.findOne({ email: googleUser.data.email });

    if (!userResponse) {
      const userObj = {
        name: googleUser.name,
        email: googleUser.email,
        encryptedPassword: "12345678",
      };

      const hashedPassword = await bcrypt.hash("12345678", 10);

      userObj.encryptedPassword = hashedPassword;

      // Create the user with the hashed password
      console.log("B");
      const newUser = await User.create(userObj);
      console.log("C");

      // Remove password from the response
      const { encryptedPassword, ...userWithoutPassword } = newUser.toObject();

      const token = jwt.sign(
        { name: newUser.name, userId: newUser._id },
        process.env.JWT_SECRET_KEY
      );

      res.status(200).json({
        message: "SignUp successful",
        user: userWithoutPassword,
      });
    } else {
      const { encryptedPassword, ...userWithoutPassword } =
        userResponse.toObject();
      const token = jwt.sign(
        { name: userResponse.name, userId: userResponse._id },
        process.env.JWT_SECRET_KEY
      );

      res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.error("Error authenticating Google:", error);
    res.status(500).json({ message: "Error authenticating Google" });
  }
};

//Apple Oauth
exports.appleAuth = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
