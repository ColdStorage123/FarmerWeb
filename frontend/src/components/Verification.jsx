

import React, { useState, useRef, useEffect } from 'react';
//import './Verification.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Verification = () => {
    //const { userData } = route.params;
    const [userCode, setUserCode] = useState('XXXXXX');
    const [verificationCode, setVerificationCode] = useState('');
    const [actualCode, setActualCode] = useState(null);
    const codeInputs = useRef([]);

    const location = useLocation();
    const userData = location.state?.userData; //Retrieve the userData from location state
    useEffect(() => {
        if (userData && userData.length > 0) {
            setActualCode(userData[0]?.VerificationCode);
        }
    }, [userData]); // Add userData as a dependency to the useEffect hook
    

    let navigate = useNavigate();
    const handleVerification = () => {
        console.log("email verification code: ", actualCode);
        console.log("user code: ", verificationCode);
        if (verificationCode === 'XXXXXX' || verificationCode === '') {
            window.alert('Please enter the verification code.');
            return;
        }

        if (verificationCode === actualCode) {
            const postData = {
                fullName: userData[0]?.fullName,
                email: userData[0]?.email,
                password: userData[0]?.password,
                confirmPassword: userData[0]?.confirmPassword,
                phoneNumber: userData[0]?.phoneNumber,
            };

            fetch('http://192.168.243.1:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    if (data.message === 'User Registered successfully') {
                        alert(data.message);
                        navigate('/Login')
                    }
                    else {
                        alert(data.message);
                    }
                });
        }
        else {
            window.alert('Error', 'Incorrect verification code entered!');
            // Handle incorrect code logic
        }
    };

    const handleChangeCode = (text, index) => {
        const updatedCode = verificationCode.split('');
        updatedCode[index] = text;
        setVerificationCode(updatedCode.join('')); // Update the verificationCode state here
        if (text !== '' && index < codeInputs.current.length - 1) {
            codeInputs.current[index + 1].focus();
        }
    };

    return (

        <div className="verification-container">
            
            <h1>Verification</h1>
            <div className="code-container">
                {Array.from({ length: 6 }, (_, index) => (
                    <input
                        key={index}
                        ref={(ref) => (codeInputs.current[index] = ref)}
                        type="text"
                        maxLength={1}
                        value={verificationCode.charAt(index) || ''}
                        onChange={(e) => handleChangeCode(e.target.value, index)}
                    />
                ))}
            </div>
            <button className="verify-button" onClick={handleVerification}>
                Verify
            </button>
        </div>
    );
};

export default Verification;



