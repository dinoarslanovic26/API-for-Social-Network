const { Schema, Types, model } = require("mongoose");


const reactionsSchema = new Schema(
  {
    reactionId: { //mongoose object id, default value is set to new value
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { //string, required, 280
      type: String,
      maxLength: 280,
      required: true,
    },
    username: { //string, required
      type: String,
      required: true,
    },
    createdAt: { //date, current timestamp with getters
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const thoughtSchema = new Schema({ 
  thoughtText: {//string, required, 280
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {// date, current timestamp, getter method
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {// string and required
    type: String,
    required: true,
  },
  reactions: [reactionsSchema],
});


//virtual prop - reaction count in the mongoose schema that is able to return the array of reactions schema, line 19
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

//works only when page is set in this order