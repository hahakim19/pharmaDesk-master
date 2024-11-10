import { HOST } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useConfirmTransaction = () => {

    const [success, setSuccess] = useState(null);

    const [isTransactionLoading, setIsTransactionLoading] = useState(false);

    const [hasError, setHasError] = useState(null);

    const confirmTransaction = async (userId, perscriptionId, clientId, formData) => {

        setIsTransactionLoading(true);

        try {

            const body = {
                idClient: clientId,
                posiologies: formData,
            };
            console.log(body);
            const res = await fetch(`${HOST}/api/Confirmation_prescription/${userId}/${perscriptionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!res.ok) {
                throw new Error('An error has occured, please try again in a moment...');
            }

            console.log(await res.json());
            setSuccess(true);
        } catch (error) {
            setHasError(error);
            console.log(error);
        }
        setIsTransactionLoading(false);
    }

    return { confirmTransaction, success, isTransactionLoading, hasError };
};

export default useConfirmTransaction;