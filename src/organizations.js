import { Organization } from "./classOrg";

let organisations = [];
let totalOrg = 0;

function createOrganisation(name, walletAddress, description) {
  let newOrganisation = new Organization(name, walletAddress, description);
  totalOrg = totalOrg + 1;
  newOrganisation.id = totalOrg;
  organisations.push(newOrganisation);
  return newOrganisation;
}

function getOrganisations() {
  let organisationList = organisations.map((org) => {
    return org.getOrganizationDetails();
  });
  console.log(organisationList);
  return organisationList;
}

function getOrganisation(index) {
  organisations.map((org, key) => {
    if (index === org.id) {
      return org.getOrganizationDetails();
    }
  });
}

export { createOrganisation, getOrganisation, getOrganisations, organisations };
