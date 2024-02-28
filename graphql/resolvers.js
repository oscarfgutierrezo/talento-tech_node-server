const UserSchema = require("../models/User");
const MessageSchema = require("../models/Message");

const resolvers = {
  hello: () => {
    return "Hello world";
  },

  User: async (_, { id }) => {
    try {
      return (user = await UserSchema.findById(id));
    } catch (error) {
      console.log(error);
    }
  },

  Users: async () => {
    try {
      return await UserSchema.find();
    } catch (error) {
      console.log(error);
    }
  },

  UsersByFilter: async (_, { filter }) => {
    try {
      let query = {};

      if (filter) {
        if (filter.name) {
          // {name: "Mar"}
          query.name = { $regex: filter.name, $options: "i" };
        }
        if (filter.email) {
          // {email: "juan@"}
          query.email = { $regex: filter.email, $options: "i" };
        }
        if (filter.lastname) {
          // {lastname: "San"}
          query.lastname = { $regex: filter.lastname, $options: "i" };
        }

        const users = await UserSchema.find(query);
        return users;
      }
    } catch (error) {}
  },

  Message: async (_, { id }) => {
    try {
      return (message = await MessageSchema.findById(id)
        .populate({
          path: "from",
          select: "-password",
        })
        .populate({
          path: "to",
          select: "-password",
        }));
    } catch (error) {
      console.log(error);
    }
  },

  Messages: async () => {
    try {
      return await MessageSchema.find()
        .populate({
          path: "from",
          select: "-password",
        })
        .populate({
          path: "to",
          select: "-password",
        });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = resolvers;
