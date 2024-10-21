import { IconBuildingSkyscraper } from "@tabler/icons-react";
import CustomModal from "../../ui/CustomModal";

export default function CompaniesPage() {
    return (
        <div>
            <CustomModal title={"Add new company"} userType={"TSL"} icon={<IconBuildingSkyscraper/>} showComponent={undefined} disabled={false} exportButtonText={"Add new"}/>
        </div>
    );
}