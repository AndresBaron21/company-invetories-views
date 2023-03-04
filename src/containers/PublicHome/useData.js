import React, { useState, useEffect, } from 'react';

const useRecord = () => {
    const [showHome, setShowHome] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowHome(true)
          }, "8000")
    });

    return {
        showHome,
    }
};

export { useRecord };