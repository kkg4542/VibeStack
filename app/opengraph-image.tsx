import { ImageResponse } from 'next/og';



export const alt = 'VibeStack - AI Productivity Lab';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#09090b', // zinc-950
                    backgroundImage: 'linear-gradient(to bottom right, #18181b 25%, #09090b 75%)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    {/* Logo Icon Mockup */}
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            background: 'rgba(99, 102, 241, 0.2)', // indigo-500/20
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 24,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#818cf8" // indigo-400
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 21v-6M8 9h8a2 2 0 0 1 2 2v6H6v-6a2 2 0 0 1 2-2Z" />
                            <path d="M12 3L6 9h12l-6-6Z" />
                        </svg>
                    </div>
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        VibeStack
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 32,
                        background: 'linear-gradient(to right, #818cf8, #c084fc)', // indigo-400 to purple-500
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 600,
                    }}
                >
                    AI Productivity Lab
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
