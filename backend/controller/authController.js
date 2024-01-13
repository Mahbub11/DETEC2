const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const db = require("../model/index");
const User = db.user;
const Profile = db.profile;

exports.createUser = catchAsyncError(async (req, res, next) => {
  // console.log(req)
  if (!req.body) {
    return next(new ErrorHandler("Content must not be Empty", 400));
  }
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // find if user is already existing
    const ifUserexist = await User.findAll({
      where: {
        email: email,
      },
    });
    if (ifUserexist.length > 0) {
      return next(new ErrorHandler("User already registered try Login", 400));
    }

    const user = {
      name: name,
      email,
      password: hashedPassword,
    };

    await User.create(user)
      .then(async (data) => {
        const userInfo = {
          user: data.id,
        };
        await Profile.create(userInfo)
          .then()
          .catch((error) => {
            return next(new ErrorHandler(error.message, 500));
          });
        const activationToken = createActivationToken(user);
        const activationUrl = `https://localhost:3006/auth/activation/${activationToken}`;

        try {
          await sendMail({
            email: user.email,
            subject: "Activate your account on Practicemania",
            message: `Hello ${name}, please click on the link to activate your account: ${activationUrl}`,
          });
          res.status(201).json({
            success: true,
            message: `please check your email:- ${email} to activate your account!`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating User Account",
        });
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "20m",
  });
};

exports.activateAccount = catchAsyncError(async (req, res, next) => {
  try {
    const activation_token = req.params.actoken;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { email } = newUser;
    const data = await User.findAll({ where: { email: email } });

    if (!data) {
      return next(new ErrorHandler("Token Verification Failed", 400));
    } else {
      await User.update(
        { is_active: true },
        {
          where: { email: email },
        }
      );

      res.status(201).json({
        success: true,
        message: "Account Activated Successfully",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.signIn = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    if (!user.is_active) {
      return next(new ErrorHandler("Account not Activated", 401));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    await user.update({ accessToken: token });
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});
exports.getUser = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userInfo.id } });

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.passResetRequest = catchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;

    // find if user is already existing
    const ifUserexist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!ifUserexist) {
      return next(new ErrorHandler("User not found with this email", 400));
    }
    const passResetToken = passwordResetToken(email);
    const passResetUrl = `https://localhost:3006/auth/pass-reset/${passResetToken}`;
    try {
      await sendMail({
        email: email,
        subject: "Reset password on Practicemania",
        message: `Hello ${ifUserexist.name}, please click on the link to Reset your password: ${passResetUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${email} to reset password!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
const passwordResetToken = (email) => {
  return jwt.sign({ email: email }, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h",
  });
};

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  try {
    const passtoken = req.params.passtoken;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = jwt.verify(passtoken, process.env.ACTIVATION_SECRET);

    if (!user) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { email } = user;
    await User.update({ password: hashedPassword }, { where: { email: email } })
      .then((val) => {
        res.status(201).json({
          success: true,
          message: `Password updated successfully`,
        });
      })
      .catch((err) => {
        return next(new ErrorHandler("Password Reset Failed" + err, 400));
      });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.logout = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
