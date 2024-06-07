import Mongoose from "mongoose";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends Mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = Mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
