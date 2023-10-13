import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minlength: [5, "Full name should be atleast 5 characters long"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email address"],
      validate: [validator.isEmail, "Invalid email address"],
      unique: true,
    },

    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      validate: [validator.isMobilePhone, "Invalid phone number"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be atleast 8 characters long"],
      trim: true,
      select: false,
    },

    dateOfBirth: {
      type: String,
      required: [true, "Please provide your date of birth"],
    },

    role: {
      type: String,
      default: "trainee",
      enum: {
        values: ["trainee", "admin", "trainer"],
        message: "{VALUE} is not a type of role",
      },
    },

    photo: String,
    height: Number,
    weight: Number,
    bodyFatPercentage: Number,
    muscleMass: Number,
    exerciseLevel: {
      squat: Number,
      benchPress: Number,
      pullUpReps: Number,
      pushUpReps: Number,
      deadLift: Number,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    packages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Package",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Hash password before saving it to DB
schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
  next();
});

// Instance method to check password
schema.methods.checkPassword = function (triedPassword) {
  return bcrypt.compare(triedPassword, this.password);
};

export default mongoose.model("User", schema);
