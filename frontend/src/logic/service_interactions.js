import BackendApiUrl from "@/routes/BackendApiUrl";
import Cookies from "js-cookie";

export const DoServiceRequest = async (companyid, companyserviceid) => {
  if (Cookies.get("user-type") === "CO" || !Cookies.get("user-type")) {
    alert("Only Registered Customers can request services");
    return;
  }
  let addr = prompt("Please Insert Your Address");
  let hours = prompt("How many hours are required");
  if (parseInt(hours) < 1 || !addr || !addr.trim() || !hours) {
    alert("invalid entry");
    return;
  }
  let customer_id = Cookies.get("u-id");

  const res = await fetch(BackendApiUrl + "/service/request", {
    method: "POST",
    body: JSON.stringify({
      cu_id: customer_id,
      company_id: companyid,
      company_service_id: companyserviceid,
      address: addr,
      hours: hours,
    }),
  });

  if (res.status === 201) {
    alert("SERVICE REQUEST SUCCESSFUL");
    window.location.reload();
  } else {
    alert("ERROR MAKING REQUEST");
    console.error(res.status, res.statusText);
  }
};

export const GetAllWorkingFOW = async () => {
  try {
    const response = await fetch(BackendApiUrl + "/field-of-work/");
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    let arr = [];
    data.map((element) => {
      if (element.ucode !== "AIO") {
        arr.push({
          displayName: element.name,
          ucode: element.code,
        });
      }
    });
    console.log(arr);
    return arr;
  } catch (error) {
    alert("Error fetching Valid FOWs:", error);
    console.error("Error fetching data:", error);
  }
};

export const DoServiceCreate = async () => {
  let FOW_ARR = await GetAllWorkingFOW();

  console.log(FOW_ARR);
  if (Cookies.get("user-type") !== "CO") {
    alert("you cannot create a service when you aren't a company");
    return;
  }
  let sname = prompt("Enter Service Name");
  let sdesc = prompt("Enter Service Description");
  let company_name = Cookies.get("user-name");
  let id = Cookies.get("u-id");
  // check the cookies for the FOW

  let field;

  if (Cookies.get("FOW") === "AIO") {
    let user_entry = prompt("enter required field of work");
    let fow_obj = FOW_ARR.find(
      (o) => o.displayName.toLowerCase() === user_entry.toLowerCase()
    );
    if (!fow_obj) {
      alert("invalid FOW");
      return;
    }
    field = fow_obj.ucode;
  } else {
    field = Cookies.get("FOW");
  }

  let pph = prompt("Enter price Per Hour");

  if (
    !pph ||
    !sname.trim() ||
    !sdesc.trim() ||
    !pph.trim() ||
    field.toLowerCase() === "AIO".toLowerCase() ||
    parseInt(pph) < 0
  ) {
    alert("Invalid entry detected");
    console.warn(sname, sdesc, field, pph);
    console.log(FOW_ARR);
    return;
  }

  if (!field) {
    alert("Invalid Field Of Work");
    return;
  }

  console.warn(
    JSON.stringify({
      uid: id,
      field: field,
      company_name: company_name,
      description: sdesc,
      service_name: sname,
      price_per_hour: pph,
    })
  );

  const res = await fetch(BackendApiUrl + "/service/create", {
    method: "POST",
    body: JSON.stringify({
      uid: id,
      field: field,
      company_name: company_name,
      description: sdesc,
      service_name: sname,
      price_per_hour: pph,
    }),
  });

  if (res.status === 201) {
    alert("SUCCESSFUL SERVICE CREATION");
    window.location.reload();
  } else {
    alert("ERROR CREATING SERVICE");
    console.error(res.status, res.statusText);
  }
};
