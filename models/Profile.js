const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users" // collection in database
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    //Select list in front-end form eg: student, senior/junior developer
    type: String,
    required: true
  },
  skills: {
    type: [String], //Array of strings - in form comma seperated values
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    //Embeded object
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        reqiured: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        reqiured: true
      },
      to: {
        type: Date //not required bc in the form there will be a checkbox for current
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    //Embeded object
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        reqiured: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        reqiured: true
      },
      to: {
        type: Date //not required bc in the form there will be a checkbox for current
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
