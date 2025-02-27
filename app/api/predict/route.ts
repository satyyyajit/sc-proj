import { NextRequest,NextResponse } from "next/server";


export  async function POST(req:NextRequest) {

    const data = await req.json();
    // Call the model
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const prediction = await response.json();

    return NextResponse.json({ prediction, message: 'predicted' }, { status: 200 });
  

}