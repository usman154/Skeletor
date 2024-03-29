import { CustomMongoose } from "../../../../lib";
import { User } from "../../../models";

class UserService {
  constructor() {}

  async getUser(request) {
    let query = CustomMongoose.getUserQuery(request);
    let pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "locations",
          localField: "location_id",
          foreignField: "location_id",
          as: "location",
        },
      },
      {
        $addFields: {
          location_name: { $first: "$location.name" },
        },
      },
      {
        $project: {
          location: 0,
          hash: 0,
          salt: 0,
        },
      },
    ];
    let response = await User.aggregate(pipeline);
    return response;
  }

  async getUserByUserId(userId) {
    let response = await User.findOne({ user_id: userId });
    return response;
  }

  async getUserByUserIds(userIds) {
    let query = { active: true, user_id: { $in: userIds } };
    let response = await User.find(query).lean();
    return response;
  }

  async setUser(data, user) {
    user.user_id = data.user_id;
    user.name = data.name;
    user.email = data.email.toLowerCase();
    user.type = data.type;
    if (data.password && data.password != "defaultpassword") {
      // this value is set up from frontend
      user.setPassword(data.password);
    }
    let userObject = await user.save();
    let cloned = await user.formatUser();
    return {
      token: user.generateJwt(),
      ...cloned,
    };
  }
  async addUser(data) {
    let user = new User();
    return await this.setUser(data, user);
  }
  async updateUser(data) {
    let dbUser = await this.getUserByUserId(data.user_id);
    return await this.setUser(data, dbUser);
  }

  async deleteUser(userId) {
    let data = {
      active: false,
    };
    let response = User.findOneAndUpdate({ user_id: userId }, data, {
      new: true,
    });
    return response;
  }

  async userResponseObject(userObject) {
    let cloned = userObject;
    delete cloned.hash;
    delete cloned.salt;
    return cloned;
  }
}

export default new UserService();
