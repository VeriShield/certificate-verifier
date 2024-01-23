import { organisations } from "./organizations";

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
    if (index === org.id) {
      return this.courses;
    }
  });
}

export { addCourseToOrg, getCourses };
