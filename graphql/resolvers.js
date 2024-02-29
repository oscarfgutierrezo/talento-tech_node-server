const UserSchema = require("../models/User");
const MessageSchema = require("../models/Message");
const HouseSchema = require("../models/House");

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

  MessagesByFilter: async (_, { filter }) => {
    try {
      let query = {};

      if (filter) {
        if (filter.from) {
          query = { from: filter.from };
        }
        if (filter.to) {
          query = { to: filter.to };
        }
        if (filter.body) {
          query.body = { $regex: filter.body, $options: "i" };
        }

        const messages = await MessageSchema.find(query)
          .populate("from")
          .populate("to");
        return messages;
      }
    } catch (error) {}
  },

  House: async (_, { id }) => {
    try {
      return (house = await HouseSchema.findById(id));
    } catch (error) {
      console.log(error);
    }
  },

  HousesByFilter: async (_, { filter }) => {
    try {
      let query = {};

      if (filter) {
        if (filter.address) {
          query.address = { $regex: filter.address, $options: "i" };
        }
        if (filter.city) {
          query.city = { $regex: filter.city, $options: "i" };
        }
        if (filter.state) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.size) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.zip_code) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.rooms) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.bathrooms) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.parking) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.price) {
          query.state = { $regex: filter.state, $options: "i" };
        }
        if (filter.code) {
          query.state = { $regex: filter.state, $options: "i" };
        }

        const houses = await HouseSchema.find(query);
        return houses;
      }
    } catch (error) {}
  },
};

module.exports = resolvers;
