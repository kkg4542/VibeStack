import { ImageResponse } from 'next/og';



export const alt = 'VibeStack - AI Productivity Lab';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Direction B: graphite ground, one solid orange bar, big bold uppercase
// type. No gradients, no glow, no tinted pills.
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#18191b',
                    color: '#eff0f1',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', width: '100%', height: 8, background: '#ff4a1f' }} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                        padding: '72px 80px 80px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 168,
                            fontWeight: 800,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            color: '#eff0f1',
                        }}
                    >
                        VibeStack
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 36,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                padding: '12px 24px',
                                background: '#ff4a1f',
                                color: '#18191b',
                                fontSize: 40,
                                fontWeight: 800,
                                textTransform: 'uppercase',
                            }}
                        >
                            AI Productivity Lab
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '0 80px 64px',
                        fontSize: 30,
                        fontWeight: 600,
                        color: '#9c9ea3',
                    }}
                >
                    usevibestack.com
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
