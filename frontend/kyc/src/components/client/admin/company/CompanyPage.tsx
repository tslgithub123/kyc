import AddCompany from "./CreateCompanyProfile";
import AddCompanyUnit from "./AddCompanyUnit";
import MyCompany from "./MyCompany";
import CreateCompanyProfile from "./CreateCompanyProfile";

export default function CompanyPage() {
    return (
        <div>
            <CreateCompanyProfile/>
            <AddCompanyUnit/>
            <MyCompany/>
        </div>
    )
}