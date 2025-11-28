const DividerBlock = ({ style = 'solid', spacing = 'medium', color = 'gray', opacity = 50 }) => {
    const spacings = {
        small: 'my-4',
        medium: 'my-8',
        large: 'my-12'
    };

    const colors = {
        gray: 'border-gray-200',
        primary: 'border-primary-200',
        secondary: 'border-secondary-200',
        white: 'border-white'
    };

    return (
        <div className={`w-full ${spacings[spacing]} flex items-center justify-center`}>
            {style === 'solid' && (
                <div className={`w-full border-t ${colors[color]} opacity-${opacity}`}></div>
            )}

            {style === 'dashed' && (
                <div className={`w-full border-t-2 border-dashed ${colors[color]} opacity-${opacity}`}></div>
            )}

            {style === 'dots' && (
                <div className="flex gap-2">
                    <div className={`size-2 rounded-full bg-current opacity-${opacity}`}></div>
                    <div className={`size-2 rounded-full bg-current opacity-${opacity}`}></div>
                    <div className={`size-2 rounded-full bg-current opacity-${opacity}`}></div>
                </div>
            )}

            {style === 'gradient' && (
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
            )}
        </div>
    );
};

export default DividerBlock;
