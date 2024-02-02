var { organisations } = require("./organizations.js");

let courses = [];

function addCourseToOrg(orgName, courseName) {
  organisations.map((org, index) => {
    if (org.name == orgName) {
      return org.addCourse(courseName);
    }
  });
}

function getCourses(index) {
  organisations.map((org, key) => {
    if (index === key) {
      return org.courses;
    }
  });
}

module.exports = { addCourseToOrg, getCourses };
