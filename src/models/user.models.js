import mongoose from "mongoose";
import { GenderEnums, ProviderEnums } from "./../common/enums/index.js";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  gender: {
    type: String,
    enum: Object.values(GenderEnums),
    default: GenderEnums.Male
  },
  provider: {
    type: String,
    enum: Object.values(ProviderEnums),
   default: ProviderEnums.System
  }
});


userSchema.virtual("userName")
  .set(function (value) {
    let [firstname, lastname] = value.split(" ");
    this.firstname = firstname;
    this.lastname = lastname;
  })
  .get(function () {
    return `${this.firstname} ${this.lastname}`;
  });

export const UserModel = mongoose.model("User", userSchema);