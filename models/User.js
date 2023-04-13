const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {// string, unique, required, trimmed
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: { // string, required, unique, email validation
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //regex expression of email validation
    },
    thoughts: [
      {// array of id values from the thought model
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {// array of id values from the user model
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { //json output in insomnia
      virtuals: true,
    },
    id: false,
  }
);


//virtual prop - using the userschema from mongoose then returns friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
