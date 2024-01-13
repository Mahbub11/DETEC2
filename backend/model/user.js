module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password must be given" },
      },
    },
    is_staff: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_premium: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    premium_expiry_date: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    subscription_type: {
      type: Sequelize.TEXT("tiny"),
      defaultValue: "FREE",
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return User;
};
