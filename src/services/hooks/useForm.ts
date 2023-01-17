import { SyntheticEvent, useState } from 'react';

export function useForm(inputValues: { [key: string]: string }) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: SyntheticEvent) => {
        const { value, name } = event.target as HTMLInputElement;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
