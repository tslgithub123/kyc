import React from 'react';
import { Button } from '@mantine/core';

interface CaptureButtonProps {
    icon: React.ReactNode;
    color: string; 
    elementId: string;
    filename?: string;
    buttonText: string;
    variant?: 'filled' | 'outline' | 'light' | 'subtle' | 'default';
}

const CaptureButton: React.FC<CaptureButtonProps> = ({
    icon,
    color,
    elementId,
    filename = 'user_identity_card.png',
    buttonText,
    variant = 'filled',
}) => {

    const handleCapture = () => {
        import('html2canvas').then(module => {
            const html2canvas = module.default;
            const element = document.getElementById(elementId);
            if (element) {
                const svgElements = element.querySelectorAll('svg');
                svgElements.forEach((svg) => {
                    svg.setAttribute('width', svg.clientWidth.toString());
                    svg.setAttribute('height', svg.clientHeight.toString());
                });

                html2canvas(element).then(canvas => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = filename;
                    link.click();
                });
            }
        });
    };

    return (
        <Button variant={variant} color={color} onClick={handleCapture}>
            {icon}
            {buttonText}
        </Button>
    );
};

export default CaptureButton;
