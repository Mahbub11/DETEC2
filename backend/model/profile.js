module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    user: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    s_email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    q_attempt: {
      type: Sequelize.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    wordlist:{
      type:Sequelize.JSON,
      allowNull: true,
    },
    bookmark:{
      type:Sequelize.JSON,
      allowNull: true,
    },
    extra_info:{
      type:Sequelize.JSON,
      allowNull: true,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return Profile;
};
