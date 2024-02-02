// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here
// import { ethers } from "ethers";
const { ethers } = require("ethers");
// import * as certificate from "./certificate.js";
var certificate = require("./certificate.js");
// import * as courses from "./courses.js";
var courses = require("./courses.js");
// import * as organisation from "./organizations.js";
var organisation = require("./organizations.js");
// import * as students from "./students.js";
var students = require("./students.js");
var viem = require("viem");
var erc721abi = require("./erc721.json");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);
const DAPP_ADDRESS_REALY = "0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE";
const ERC_20_PORTAL = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB";
const ERC_721_PORTAL = "0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87";
const erc721_contract_address = viem.getAddress(
  "0x483fAf58Daac5ce4B73994f50b279050Bf2A1A95"
);
let DAPP_ADDRESS = "null";

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));
  const payload = data.payload;
  let JSONpayload = {};
  try {
    if (
      String(data.metadata.msg_sender).toLowerCase() ===
      DAPP_ADDRESS_REALY.toLowerCase()
    ) {
      console.log("setting Dapp address:", payload);
      DAPP_ADDRESS = payload;
    }

    console.log("payload:" + JSON.stringify(payload));
    const payloadStr = ethers.toUtf8String(payload);
    JSONpayload = JSON.parse(payloadStr);
    console.log(`received request ${JSON.stringify(JSONpayload)}`);
  } catch (e) {
    console.log("error is:", e);
    console.log(`Adding notice with binary value "${payload}"`);
    await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: payload }),
    });
    return "reject";
  }

  let advance_req;
  try {
    // {"method": "create_organization", "name":"0xreadyPlayer1", "description": "A nice Organization"}
    if (JSONpayload.method === "create_organization") {
      console.log("creating organization....");
      const createdOrg = organisation.createOrganisation(
        JSONpayload.name,
        data.metadata.msg_sender,
        JSONpayload.description
      );
      console.log("the new organisation is: ", createdOrg);

      const result = JSON.stringify({ createdOrg });
      // convert result to hex
      const hexresult = stringToHex(result);
      console.log("The result is :", hexresult);
      advance_req = await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: hexresult }),
      });

      //{"method":"verify_certificate","org_name": "tech", "course_name": "computer", "id": "1"}
      // NOTE: replace the id with student id.
    } else if (JSONpayload.method === "verify_certificate") {
      let studentID = certificate.verifyCertificate(
        // ethers.getAddress(JSONpayload.user)
        JSONpayload.org_name,
        JSONpayload.course_name,
        JSONpayload.id
      );
      console.log("verifying certificate ...");
      console.log("Certificate Verification: " + JSON.stringify(studentID));
    }

    //{"method":"add_course","org_name": "EXAMPLE","course_name": "tech"}
    else if (JSONpayload.method === "add_course") {
      console.log("creating course...");
      let approvedAddress = organisation.allowedAddresses.find((address) => {
        address;
      });
      if (data.metadata.msg_sender === approvedAddress) {
        let addCourse = courses.addCourseToOrg(
          JSONpayload.org_name,
          JSONpayload.course_name
        );

        const result1 = JSON.stringify({ addCourse });
        console.log("New course added:" + addCourse);
        const hexresult1 = stringToHex(result1);
        // console.log("result1 in hex is:", hexresult1);
        advance_req = await fetch(rollup_server + "/notice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payload: hexresult1 }),
        });
      } else {
        console.log("You are not approved to create a course");
      }
    }

    //{"method":"add_student","org_name": "EXAMPLE","course_name": "tech", "student_name": "EXAMPLE","student_wallet": "tech" }
    else if (JSONpayload.method === "add_student") {
      console.log("adding student...");
      let approvedAddress = organisation.allowedAddresses.find(
        (address) => address
      );
      if (data.metadata.msg_sender === approvedAddress) {
        let addStudent = students.addStudent(
          JSONpayload.org_name,
          JSONpayload.course_name,
          JSONpayload.student_name,
          JSONpayload.student_wallet
        );

        const result1 = JSON.stringify({ addStudent });
        console.log(
          `New student added to ${JSONpayload.course_name}: ${addStudent}`
        );
        const hexresult1 = stringToHex(result1);
        // console.log("result1 in hex is:", hexresult1);
        advance_req = await fetch(rollup_server + "/notice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payload: hexresult1 }),
        });
      } else {
        console.log("You are not approved to add a student");
      }
    }
    //{"method":"generate_certificate","org_name": "EXAMPLE","course_name": "tech", "student_id": 1 }
    else if (JSONpayload.method === "generate_certificate") {
      console.log("generating certificate...");
      let approvedAddress = organisation.allowedAddresses.find(
        (address) => address
      );
      if (data.metadata.msg_sender === approvedAddress) {
        let generateCertificate = certificate.generateAndIssueCertificate(
          JSONpayload.org_name,
          JSONpayload.course_name,
          JSONpayload.student_id
        );

        const result1 = JSON.stringify({ generateCertificate });
        console.log(`New certificate generated: ${generateCertificate}`);
        const hexresult1 = stringToHex(result1);
        // console.log("result1 in hex is:", hexresult1);
        advance_req =
          (await fetch(rollup_server + "/notice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ payload: hexresult1 }),
          })) && console.log("minting erc721 token.....");

        const call = await viem.encodeFunctionData({
          abi: erc721abi,
          functionName: "safeMint",
          args: [data.metadata.msg_sender, JSONpayload.student_id],
        });
        let voucher = {
          destination: erc721_contract_address, // dapp Address
          payload: call,
        };
        console.log(voucher);
        advance_req = await fetch(rollup_server + "/voucher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voucher),
        });
        console.log("starting a voucher");
      } else {
        console.log("You are not approved to add a student");
      }
    } else {
      console.log("method undefined");
      const result = JSON.stringify({
        error: String("method undefined:" + JSONpayload.method),
      });
      const hexresult = stringToHex(result);
      await fetch(rollup_server + "/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          payload: hexresult,
        }),
      });
    }
  } catch (e) {
    console.log("error is:", e);
    await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: stringToHex(JSON.stringify({ error: e })),
      }),
    });
    return "reject";
  }
  const json = await advance_req.json();
  console.log(
    "Received  status " +
      advance_req.status +
      " with body " +
      JSON.stringify(json)
  );
  return "accept";
}

async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));
  return "accept";
}

var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
