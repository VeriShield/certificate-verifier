import { organisations } from "./organizations";

async function handle_details(name, date, admin_name, signature) {
  const details = {};
  details.name = name;
  details.date = date;
  details.admin_name = admin_name;
  details.signature = signature;

  return details;
}

function returnCert(orgIndex, studentName) {
  organisations.map((org, index) => {
    if (orgIndex === org.id) {
      org.course;
    }
  });
}
