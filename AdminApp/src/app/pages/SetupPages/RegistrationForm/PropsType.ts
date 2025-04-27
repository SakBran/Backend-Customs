type RegistraionProps = {
    next: () => void;
    prev: () => void;
    id: string;
    applyType: string;
    setId: (id: string) => void;
    registrationType: string;
    setRegistrationType: (registrationType: string) => void;
    includeButton: boolean;
};
export default RegistraionProps;