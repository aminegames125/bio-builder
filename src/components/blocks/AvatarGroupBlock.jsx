const AvatarGroupBlock = ({ avatars, limit = 5, size = 'md' }) => {
    const sizes = {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base'
    };

    const displayAvatars = avatars.slice(0, limit);
    const remaining = avatars.length - limit;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <div className="flex items-center justify-center -space-x-3">
            {displayAvatars.map((avatar, index) => (
                <div
                    key={index}
                    className={`relative ${sizeClass.split(' ')[0]} rounded-full ring-2 ring-white overflow-hidden shadow-sm hover:z-10 hover:scale-110 transition-transform`}
                >
                    <img
                        src={avatar.src}
                        alt={avatar.alt || 'User'}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {remaining > 0 && (
                <div className={`
          relative ${sizeClass} rounded-full ring-2 ring-white bg-gray-100 
          flex items-center justify-center font-bold text-gray-600 shadow-sm z-0
        `}>
                    +{remaining}
                </div>
            )}
        </div>
    );
};

export default AvatarGroupBlock;
