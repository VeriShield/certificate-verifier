export default class Organization {
  constructor(name, walletAddress, description) {
    this.name = name;
    this.walletAddress = walletAddress;
    this.description = description;
    this.courses = {};
  }

  addCourse(courseName) {
    this.courses[courseName] = [];
  }

  addCertificate(image) {
    this.courses[image] = [];
  }

  enrollStudent(courseName, studentDetails) {
    if (!this.courses[courseName]) {
      console.error(`Course "${courseName}" does not exist.`);
      return;
    }

    this.courses[courseName].push(studentDetails);
  }

  getOrganizationDetails() {
    return {
      name: this.name,
      walletAddress: this.walletAddress,
      description: this.description,
      courses: this.courses,
    };
  }
}

// export { Organization };
