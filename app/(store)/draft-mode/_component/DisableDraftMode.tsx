'use client';
import { Button } from '@/components/ui/button';
import { useDraftModeEnvironment } from 'next-sanity/hooks';
import { useRouter } from 'next/navigation';

const DisableDraftMode = () => {
    const environment = useDraftModeEnvironment();
    const router = useRouter();

    //   Only show the disable draft mode button when outside of Presentation Tool
    if (environment !== 'live' && environment !== 'unknown') {
        return null;
    }

    const handleClick = async () => {
        await fetch('/draft-mode/disable');
        router.refresh();
    };
    return (
        <Button
            onClick={handleClick}
            className="hoverEffect fixed bottom-4 right-4 z-50 bg-gray-50 px-4 py-2 text-black hover:text-white"
        >
            Disable Draft Mode
        </Button>
    );
};

export default DisableDraftMode;
