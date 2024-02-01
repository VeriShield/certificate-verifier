import { organisations } from "./organizations.js";

let studentID = 0;

function addStudent(orgName, courseName, studentName, studentWallet) {
  let studentDetails = {
    id: ++studentID,
    name: studentName,
    wallet: studentWallet,
  };
  organisations.forEach((org, key) => {
    if (orgName === org.name) {
      if (courseName in org.courses) {
        org.enrollStudent(courseName, studentDetails);
      } else {
        console.error(`Course "${courseName}" does not exist in ${orgName}.`);
      }
    }
  });
}

function getStudent(index) {
  for (const org of organisations) {
    for (const courses of Object.values(org.courses || {})) {
      const student = courses.find((s) => s.id === index);
      if (student) {
        return {
          organization: org.name,
          course: Object.keys(org.courses).find(
            (key) => org.courses[key] === courses
          ),
          student,
        };
      }
    }
  }

  return null;
}

function getStudents(orgName, courseName) {
  const organization = organisations.find((org) => org.name === orgName);

  if (!organization) {
    console.error(`Organization "${orgName}" not found.`);
    return [];
  }

  const subjects = organization.courses || {};

  // Check if the courseName exists in subjects
  if (!(courseName in subjects)) {
    console.error(`Course "${courseName}" does not exist in ${orgName}.`);
    return [];
  }

  return subjects[courseName];
}

export { addStudent, getStudents, getStudent };
