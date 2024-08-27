import CompanyProfileForm from "./company/CompanyProfileForm";
import ProfileForm from "./company/CompanyProfileForm";

export default function CompanyProfiles() {
  return (
    <div>
      <h1>Company Profiles</h1>
      {/* <CompanyProfileForm/> */}
      <CompanyProfileForm profiles={[{
    "id": 1,
    "mpcbid": null,
    "branch": "Main Branch",
    "category": "IT",
    "city": "Pune",
    "compName": "Techknowgreen Ltd.",
    "contPerDesig": null,
    "contPerName": null,
    "contPerNo": null,
    "country": "India",
    "district": null,
    "email": "it@techknowgreen.com",
    "fax": null,
    "indPrimary": null,
    "indSecondary": null,
    "industryType": null,
    "lastEnv": null,
    "noWorkDays": null,
    "phoneNo": "1234567890",
    "pincode": null,
    "plotNo": null,
    "ro": null,
    "sro": null,
    "state": "Maharashtra",
    "street": null,
    "taluka": null,
    "uan": null,
    "village": null,
    "website": null,
    "workingHour": null,
    "yearEstb": null,
    "idustryType": null,
    "compEmail": null
  },
  {
    "id": 2,
    "mpcbid": null,
    "branch": "Main Branch",
    "category": "IT",
    "city": "Tech City",
    "compName": "Techknowgreen Ltd.",
    "contPerDesig": "Manager",
    "contPerName": "John Doe",
    "contPerNo": "+1234567890",
    "country": "Countryland",
    "district": "Tech District",
    "email": "contact@techknowgreen.com",
    "fax": "+0987654321",
    "indPrimary": "Software Development",
    "indSecondary": "Consulting",
    "industryType": "Technology",
    "lastEnv": "2024-08-21",
    "noWorkDays": 5,
    "phoneNo": "+1234567890",
    "pincode": "123456",
    "plotNo": "Plot 123",
    "ro": "RO123",
    "sro": "SRO456",
    "state": "Tech State",
    "street": "Tech Street",
    "taluka": "Tech Taluka",
    "uan": "UAN123456",
    "village": "Tech Village",
    "website": "https://www.techknowgreen.com",
    "workingHour": 40,
    "yearEstb": 2010,
    "idustryType": "IT Services",
    "compEmail": "info@techknowgreen.com"
  }]} />
    </div>
  );
}