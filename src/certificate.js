import { organisations } from "./organizations.js";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import crypto from "crypto";
import fontkit from "@pdf-lib/fontkit";

// Function to generate a PDF certificate and issue to a student
async function generateAndIssueCertificate(orgName, courseName, studentId) {
  const organization = organisations.find((org) => org.name === orgName);

  if (!organization) {
    console.error(`Organization "${orgName}" not found.`);
    return;
  }

  const course = organization.courses[courseName];

  const student = course.find((s) => s.id === studentId);

  if (!student) {
    console.error(
      `Student with ID ${studentId} not found in ${orgName} - ${courseName}.`
    );
    return;
  }

  // Generate certificate text
  const certificateText = `This is to certify that ${student.name} has successfully completed the course in ${courseName}.`;

  // Generate PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  pdfDoc.registerFontkit(fontkit);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText(certificateText, { x: 50, y: height - 150, font: font });

  // Issue certificate by adding a timestamp
  const issueDate = new Date().toDateString();
  page.drawText(`Issued on: ${issueDate}`, {
    x: 50,
    y: 50,
    font,
    color: rgb(0, 0, 0.5),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const certificateHash = crypto
    .createHash("sha256")
    .update(pdfBytes)
    .digest("hex");

  // Update student with certificate hash
  student.certificateHash = certificateHash;
}

// Function to verify the validity of the certificate
async function verifyCertificate(orgName, courseName, studentId) {
  const organization = organisations.find((org) => org.name === orgName);

  if (!organization) {
    console.error(`Organization "${orgName}" not found.`);
    return false;
  }

  const course = organization.courses[courseName];

  const student = course.find((s) => s.id === studentId);

  if (!student) {
    console.error(
      `Student with ID ${studentId} not found in ${orgName} - ${courseName}.`
    );
    return false;
  }

  if (!student.certificateHash) {
    console.error(`Certificate hash not found for student ${student.name}.`);
    return false;
  }

  // Regenerate certificate text (could also be stored and compared directly)
  const certificateText = `This is to certify that ${student.name} has successfully completed the course in ${courseName}.`;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  pdfDoc.registerFontkit(fontkit);

  const font = pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText(certificateText, { x: 50, y: 700, font: font });
  const pdfBytes = pdfDoc.save();

  // Verify certificate hash
  const calculatedHash = crypto
    .createHash("sha256")
    .update(pdfBytes)
    .digest("hex");
  return student.certificateHash === calculatedHash;
}

// Example usage
// generateAndIssueCertificate("Tech Institute", "Computer Science", 1)
//   .then(() => {
//     console.log("Certificate issued successfully.");
//     console.log(
//       "Verifying certificate:",
//       verifyCertificate("Tech Institute", "Computer Science", 1)
//     );
//   })
//   .catch((error) => console.error("Error:", error));

// async function handle_details(name, date, admin_name, signature) {
//   const details = {};
//   details.name = name;
//   details.date = date;
//   details.admin_name = admin_name;
//   details.signature = signature;

//   return details;
// }

// function returnCert(orgIndex, studentName) {
//   organisations.map((org, index) => {
//     if (orgIndex === index) {
//       org.course;
//     }
//   });
// }

export { generateAndIssueCertificate, verifyCertificate };
