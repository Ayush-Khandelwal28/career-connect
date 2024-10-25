import React, { useState } from 'react';

const Achievements = () => {
    const [achievement, setAchievement] = useState('');

    const handleSubmit = () => {
        const formData = {
            achievement,
        };

        console.log('Form Data:', formData);
        alert('Achievement details submitted successfully!');
    };

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              
                <div>
                    <label className="block text-sm font-medium text-gray-700">Achievement</label>
                    <input
                        type="text"
                        name="achievement"
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your achievement"
                    />
                </div>
            </form>
        </div>
    );
};

export default Achievements;
