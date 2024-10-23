import React, { useState } from 'react';

const CareerObjective = () => {

    const [text, setText] = useState('')
    return (
        <div>
            <form className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="text"
                        value=""
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                        placeholder="My career objective is to..."
                    />
                </div>
            </form>
        </div>
    )
}

export default CareerObjective