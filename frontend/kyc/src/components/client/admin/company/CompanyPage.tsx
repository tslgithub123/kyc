import AddCompanyUnit from "./AddCompanyUnit";
import MyCompany from "./MyCompany";
import CompanyMain from "./cards/CompanyMain";

export default function CompanyPage() {
    return (
        <div>
            <CompanyMain/>
            <CompanyMain/>
            <AddCompanyUnit/>
            <MyCompany/>
        </div>
    )
}