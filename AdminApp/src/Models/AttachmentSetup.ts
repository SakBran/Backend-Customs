interface AttachmentSetup {
    id: string;
    step: string;
    title: string;
    isRequired: boolean;
    isActive: string; // Note: You might want to change this to boolean if it represents a boolean value.
    registrationType: string;
}
export default AttachmentSetup;