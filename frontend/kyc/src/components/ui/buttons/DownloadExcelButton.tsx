import { Button } from '@mantine/core';
import React from 'react';
import * as XLSX from 'xlsx';

interface DownloadExcelProps {
    icon: React.ReactNode;
    color: string,
    form: {
        values: Record<string, any>;
    };
    filename?: string;
    text: string;
    variant: string;
}

const DownloadExcelButton: React.FC<DownloadExcelProps> = ({ form, filename = 'user_data.xlsx', color, icon, text, variant }) => {
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet([form.values]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const downloadAnchorNode = document.createElement('a');
        const url = URL.createObjectURL(data);
        downloadAnchorNode.href = url;
        downloadAnchorNode.download = filename;
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        URL.revokeObjectURL(url);
        downloadAnchorNode.remove();
    };

    return (
        <Button variant={variant} color={color} onClick={handleDownload}>
            {icon}
            <span style={{ paddingLeft: '8px'}}> {text} </span>
        </Button>
    );
};

export default DownloadExcelButton;
