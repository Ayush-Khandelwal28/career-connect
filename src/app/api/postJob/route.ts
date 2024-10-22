import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const date = new Date();
    // const options: Intl.DateTimeFormatOptions = { 
    //     weekday: 'short', 
    //     day: '2-digit', 
    //     month: 'short', 
    //     year: 'numeric' 
    // };
    // const curr_date = date.toLocaleDateString("en-US", options);
    // console.log('Current date:', curr_date);

    try {
        let data = await req.json(); 
        console.log('Received data:', data);
        
        data = {
            ...data,
            datePosted: date,  
        };

        console.log('Updated data with date:', data); 

        return NextResponse.json({ 
            message: "Job posted successfully!", 
            data,
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Failed to parse request' }, { status: 400 });
    }
}
