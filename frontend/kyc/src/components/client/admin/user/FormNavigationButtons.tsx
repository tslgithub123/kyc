import { Button, Group, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconUserPlus, IconFileExcel, IconImageInPicture } from "@tabler/icons-react";
import DownloadExcelButton from "../../../ui/buttons/DownloadExcelButton";
import CaptureButton from "../../../ui/buttons/CaptureScreenshotButton";
import { useForm, UseFormReturnType } from "@mantine/form";
import { getUserTypeColor } from "../../../../utils/colorUtils";

interface FormNavigationButtonsProps<T> {
    active: number;
    setActive: (active: number) => void;
    handleNext: () => void;
    handleSubmit: (event: React.FormEvent) => void;
    prevStep: () => void;
    isRegistered: boolean;
    userType: string;
    form: UseFormReturnType<T>;
}

function FormNavigationButtons<T extends { values: Record<string, any>; }>({
    active,
    setActive,
    handleNext,
    handleSubmit,
    prevStep,
    isRegistered,
    userType,
    form,
  }: FormNavigationButtonsProps<T>) {
    return (
        <Group justify="flex-end" mt="xl" p='xs' pr='xl' style={{ position: 'sticky', bottom: 0, width: '100%' }}>
            {isRegistered ? (
                <>
                    <DownloadExcelButton form={form} color={getUserTypeColor(userType)} icon={<IconFileExcel />} text='Download' variant='filled' />
                    <CaptureButton elementId='userIdentityCard' color={getUserTypeColor(userType)} icon={<IconImageInPicture />} buttonText='Capture' variant='filled' />
                </>
            ) : (
                <>
                    <Button variant="white" onClick={prevStep} color={getUserTypeColor(userType)} disabled={active === 0}>
                        <IconArrowLeft />
                        <Text style={{ paddingLeft: '8px' }}>Back</Text>
                    </Button>
                    {active < 2 ? (
                        <Button variant="white" color={getUserTypeColor(userType)} onClick={handleNext} type="button">
                            <Text style={{ paddingRight: '8px' }}>Next</Text>
                            <IconArrowRight />
                        </Button>
                    ) : (
                        <Button variant="gradient" onClick={handleSubmit}>
                            <Text style={{ paddingRight: '8px' }}>Create</Text>
                            <IconUserPlus />
                        </Button>
                    )}
                </>
            )}
        </Group>
    );
};

export default FormNavigationButtons;
