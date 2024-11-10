import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";

const Modal = ({ isOpen, onClose, onRefuse, onAccept, onConfirm, selectedNotification, confirmType }) => {

    if (!isOpen) return null;

    const [isImageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClose = () => {
        setError("");
        onClose();
    };

    if (confirmType) {

        /* Enable Posiologie */
        const [isOn, setIsOn] = useState(false);

        const toggleSwitch = () => {
            setIsOn(!isOn);
        };

        /* Quantity Per Take */
        const quantityPortion = 1 / 2;
        const [quantity, setQuantity] = useState(quantityPortion);

        /* const addQuantity = () => {
            setQuantity(prev => prev + quantityPortion);
        }

        const minusQuantity = () => {
            if (quantity > quantityPortion) {
                setQuantity(prev => prev - quantityPortion);
            }
        } */
        const addQuantity = () => {
            setForm(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                quantite: item.quantite + quantityPortion
            } : item));
        };

        const minusQuantity = () => {
            setForm(prev => prev.map((item, i) => i === formIndex && item.quantite > quantityPortion ? {
                ...item,
                quantite: item.quantite - quantityPortion
            } : item));
        };


        /* When to take? */
        const timingList = {
            avantRepas: "Avant Repas",
            apresRepas: "Après Repas",
            ajeun: "À jeun",
        };
        const [timing, setTiming] = useState(0);

        /* const handleTiming = (index) => {
            setTiming(index);
        } */
        /* const handleTiming = (index) => {
            setForm(prev => prev.map((item, i) =>
                i === formIndex ? {
                    ...item,
                    avantRepas: index === 0 ? 1 : 0,
                    apresRepas: index === 1 ? 1 : 0,
                    ajeun: index === 2 ? 1 : 0
                } : item
            ));
        }; */
        const handleTiming = (index) => {
            setForm(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                avantRepas: index === 0 ? 1 : 0,
                apresRepas: index === 1 ? 1 : 0,
                ajeun: index === 2 ? 1 : 0,
            } : item));
        };


        /* How often? */
        const oftenList = {
            matin: "Matin",
            apresMidi: "Après Midi",
            soire: "Soir",
        };
        const [often, setOften] = useState({
            matin: false,
            apresMidi: true,
            soire: false,
        });

        /* const handleOften = (key) => {
            setOften(prev => {
                const newOften = { ...prev };
                newOften[key] = !newOften[key];
                return newOften;
            });
        } */
        const handleOften = (key) => {
            setForm(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                [key]: item[key] === 1 ? 0 : 1
            } : item));
        };


        /* Number of days */
        const daysPortion = 15;
        const [days, setDays] = useState(daysPortion);

        /* const addDays = () => {
            setDays(prev => prev + daysPortion);
        }

        const minusDays = () => {
            if (days > daysPortion) {
                setDays(prev => prev - daysPortion);
            }
        } */
        const addDays = () => {
            setForm(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                duree: item.duree + daysPortion
            } : item));
        };

        const minusDays = () => {
            setForm(prev => prev.map((item, i) => i === formIndex && item.duree > daysPortion ? {
                ...item,
                duree: item.duree - daysPortion
            } : item));
        };


        /* Number of products */
        const [form, setForm] = useState([{
            "nomPils": '',
            "quantite": quantityPortion,
            "avantRepas": timing === 0 ? 1 : 0,
            "apresRepas": timing === 1 ? 1 : 0,
            "ajeun": timing === 2 ? 1 : 0,
            "matin": often.matin ? 1 : 0,
            "apresMidi": often.apresMidi ? 1 : 0,
            "soire": often.soire ? 1 : 0,
            "duree": daysPortion
        }]);
        const [formIndex, setFormIndex] = useState(0);

        /* const addProduct = () => {
            setForm(prev => {
                const form = [...prev, {
                    "nomPils": '',
                    "quantite": quantityPortion,
                    "avantRepas": timing === 0 ? 1 : 0,
                    "apresRepas": timing === 1 ? 1 : 0,
                    "ajeun": timing === 2 ? 1 : 0,
                    "matin": often.matin ? 1 : 0,
                    "apresMidi": often.apresMidi ? 1 : 0,
                    "soire": often.soire ? 1 : 0,
                    "duree": daysPortion
                }];
                return form;
            });
            navigateNext();
        } */
        const addProduct = () => {
            setForm(prev => [
                ...prev,
                {
                    "nomPils": '',
                    "quantite": quantityPortion,
                    "avantRepas": 1,
                    "apresRepas": 0,
                    "ajeun": 0,
                    "matin": often.matin ? 1 : 0,
                    "apresMidi": often.apresMidi ? 1 : 0,
                    "soire": often.soire ? 1 : 0,
                    "duree": daysPortion
                }
            ]);
            navigateNext();
        };

        const deleteProduct = () => {
            if (form.length > 1) {
                const currentIndex = formIndex;
                if (currentIndex > 0) {
                    navigatePrevious();
                }
                setForm(prev => prev.filter((_, i) => i !== currentIndex));
            }
        }

        const navigateNext = () => {
            if (form.length === 1) {
                return;
            }

            if (formIndex === form.length - 1) {
                setFormIndex(0);
            } else {
                setFormIndex(prev => prev + 1);
            }
        }

        const navigatePrevious = () => {
            if (form.length === 1) {
                return;
            }

            if (formIndex === 0) {
                setFormIndex(form.length - 1);
            } else {
                setFormIndex(prev => prev - 1);
            }
        }

        /* const updateForm = () => {
            setForm(prev => prev.map((item, index) => (index === formIndex ? {
                "nomPils": '',
                "quantite": quantity,
                "avantRepas": timing === 0 ? 1 : 0,
                "apresRepas": timing === 1 ? 1 : 0,
                "ajeun": timing === 2 ? 1 : 0,
                "matin": often.matin ? 1 : 0,
                "apresMidi": often.apresMidi ? 1 : 0,
                "soire": often.soire ? 1 : 0,
                "duree": days
            }
                : item)));
            console.log(form);
        } */

        /* useEffect(() => {
            updateForm();
        }, [quantity, timing, often, days]); */

        const currentForm = form[formIndex];

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 select-none">
                <div className="bg-white w-max rounded-lg p-6 shadow-lg">
                    <div className="flex flex-row items-center">
                        {isImageLoading && (
                            <div className="w-32 h-32 flex justify-center items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        {error === "" && (<img
                            src={selectedNotification.url}
                            alt="Perscription"
                            className="mr-4 w-96 h-96 object-cover rounded-md"
                            onLoad={() => setImageLoading(false)}
                            onError={() => setError("Image unavailable!")}
                        />)}
                        <div className="flex flex-col justify-center items-start">
                            {error !== "" && (
                                <div className="flex justify-center items-center">
                                    <span className="text-lg text-red-500">{error}</span>
                                </div>
                            )}

                            {/* Info */}
                            <h2 className="text-lg font-bold mb-2">Confirmer l'achat?</h2>
                            <div className={`grid grid-cols-6 grid-rows-5 space-y-2 my-4 ${!isOn ? 'pointer-events-none cursor-default' : ''}`}>
                                {/* Line 1 */}
                                <div className="row-span-1 col-span-6">
                                    <div className="inline-flex flex-row space-x-2 items-center justify-between">
                                        <span>Posiologie?</span>
                                        <ToggleSwitch value={isOn} toggleSwitch={toggleSwitch} className='pointer-events-auto' />
                                        <div className='inline-flex justify-center items-center space-x-1'>
                                            <MdDeleteForever className={`text-[1.5rem] cursor-pointer ${isOn ? 'text-red-500' : 'text-gray-500'}`} onClick={() => deleteProduct()} />
                                            <GrFormPrevious className="bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl" onClick={() => navigatePrevious()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{formIndex + 1}</span>
                                            <MdNavigateNext className='bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl' onClick={() => navigateNext()} />
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addProduct()} />
                                        </div>
                                    </div>
                                </div>

                                {/* Line 2 */}
                                <div className="row-span-1 col-span-6">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Quelle quantité par prise?</span>
                                        <div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className='text-[1.2rem] cursor-pointer text-textSecoundary' onClick={() => minusQuantity()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["quantite"]}</span>
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addQuantity()} />
                                        </div>
                                    </div>
                                </div>

                                {/* Line 3 */}
                                <div className="row-span-1 col-span-6 space-x-2">
                                    <span className='mr-2'>Quand prendre?</span>
                                    {Object.entries(timingList).map(([key, value], index) => (<div className='inline-flex justify-center items-center space-x-1 mx-1' key={`timing-key-${index}`}>
                                        <input
                                            type="radio"
                                            className={`${isOn ? 'text-primary' : 'text-gray-500'} cursor-pointer`}
                                            value={index}
                                            checked={currentForm[key]}
                                            onChange={() => handleTiming(index)} />
                                        <span>{value}</span>
                                    </div>))}
                                </div>

                                {/* Line 4 */}
                                <div className="row-span-1 col-span-6 space-x-2">
                                    <span className='mr-2'>À quelle fréquence?</span>
                                    {Object.entries(oftenList).map(([key, value], index) => (
                                        <span key={`often-key-${index}`} onClick={() => handleOften(key)} className={`${currentForm[key] ? 'text-white' : 'text-textPrimary'} px-2 py-1 ${currentForm[key] ? isOn ? 'bg-primary' : 'bg-gray-500' : 'bg-lightShapes'} rounded-lg cursor-pointer select-none`}>{value}</span>
                                    ))}
                                </div>

                                {/* Line 5 */}
                                <div className="row-span-1 col-span-6">
                                    <span className='mr-2'>Nombre de jours</span>
                                    <div className='inline-flex justify-center items-center space-x-1'>
                                        <FaMinus className='text-[1.2rem] text-textSecoundary cursor-pointer' onClick={() => minusDays()} />
                                        <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["duree"]}</span>
                                        <IoMdAdd className='text-[1.5rem] text-textSecoundary cursor-pointer' onClick={() => addDays()} />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between w-full">
                                <button
                                    onClick={handleOnClose}
                                    className="text-gray-400 px-4 py-2 rounded hover:bg-gray-50"
                                >
                                    Ignore
                                </button>
                                <div className="inline-flex">
                                    <button
                                        onClick={() => onRefuse(selectedNotification.idnotifications)}
                                        className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onConfirm(selectedNotification.idprescription, selectedNotification.idClient, form)}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 select-none">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                <div className="flex flex-col items-center">
                    {isImageLoading && (
                        <div className="w-32 h-32 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    {error !== "" && (
                        <div className="flex justify-center items-center">
                            <span className="text-lg text-red-500">{error}</span>
                        </div>
                    )}
                    {error === "" && (<img
                        src={selectedNotification.url}
                        alt="Perscription"
                        className="mb-4 w-96 h-96 object-cover rounded-md"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setError("Image unavailable!")}
                    />)}

                    {/* Info */}
                    <h2 className="text-lg font-bold mb-2">Accepter l'ordonnance?</h2>
                    <p className="text-gray-600 mb-4 text-center">
                        <b>{selectedNotification.firstname}</b> a envoyé une ordonnance.
                    </p>

                    {/* Actions */}
                    <div className="flex justify-between w-full">
                        <button
                            onClick={handleOnClose}
                            className="text-gray-400 px-4 py-2 rounded hover:bg-gray-50"
                        >
                            Ignore
                        </button>
                        <div className="inline-flex">
                            <button
                                onClick={() => onRefuse(selectedNotification.idnotifications)}
                                className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                            >
                                Refuse
                            </button>
                            <button
                                onClick={() => onAccept(selectedNotification.idprescription, selectedNotification.idClient)}
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;